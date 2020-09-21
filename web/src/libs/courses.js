import fs from 'fs';
import { parseLesson, parseExercise } from './markdown';
import YAML from 'yaml';

export const readFile = (file) => {
  return new Promise((resolve, reject) =>
    fs.readFile(file, 'utf-8', (err, data) =>
      err ? reject(err) : resolve(data),
    ),
  );
};

export const loadJson = (file) => {
  return readFile(file).then((data) => JSON.parse(data));
};

export const loadYaml = (file) => {
  return readFile(file).then((data) => YAML.parse(data));
};

export const loadLesson = (file) => {
  return readFile(file).then((data) => parseLesson(data));
};

export const fetchCoursesList = (section) => {
  return loadYaml(`/content/${section}/index.yaml`);
};

export const fetchCourse = (section, course) => {
  return loadYaml(`/content/${section}/${course}/index.yaml`);
};

export const fetchChapter = (section, course, chapter) => {
  return loadYaml(`/content/${section}/${course}/${chapter}/index.yaml`);
};

export const fetchLesson = (section, course, chapter, lesson) => {
  return Promise.all([
    loadLesson(`/content/${section}/${course}/${chapter}/${lesson}/lesson.md`),
    loadYaml(`/content/${section}/${course}/${chapter}/index.yaml`),
  ]).then(([{ sections, toc }, { title, lessons }]) => {
    const lessonIdx = lessons.findIndex((item) => item.link === lesson);

    return {
      course: {
        title,
      },
      lesson: {
        ...lessons[lessonIdx],
        order: lessonIdx + 1,
      },
      sections,
      toc,
      back:
        lessonIdx > 0
          ? {
              title: lessons[lessonIdx - 1].title,
              link: lessons[lessonIdx - 1].link,
            }
          : null,
      forward:
        lessonIdx < lessons.length - 1
          ? {
              title: lessons[lessonIdx + 1].title,
              link: lessons[lessonIdx + 1].link,
            }
          : null,
    };
  });
};

export const fetchExercise = (section, course, chapter, lesson, exrc) => {
  const lessonPath = `/${section}/${course}/${chapter}/${lesson}`;
  const excFilePath = `/content/${section}/${course}/${chapter}/${lesson}/excs/${exrc}.md`;

  if (fs.existsSync(excFilePath)) {
    console.log('file', exrc);
    return readFile(excFilePath).then((content) =>
      parseExercise(exrc, content),
    );
  }

  const excAssignFilePath = `/content/${section}/${course}/${chapter}/${lesson}/excs/${exrc}/assign.md`;

  if (fs.existsSync(excAssignFilePath)) {
    console.log('assign', exrc);
    return readFile(excAssignFilePath).then((content) =>
      parseExercise(exrc, content),
    );
  }
};
