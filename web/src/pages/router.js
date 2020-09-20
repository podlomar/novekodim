import Vue from 'vue';
import Router from 'vue-router';
import Home from './Home';
import CoursePage from './CoursePage';
import Article from './Article';

Vue.use(Router);

export const createRouter = () => {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/:sectionLink',
      component: Home
    },
    {
      path: '/:sectionLink/:courseLink',
      component: CoursePage
    },
    {
      path: '/:sectionLink/:courseLink/:chapterLink',
      component: CoursePage
    },
    {
      path: '/:sectionLink/:courseLink/:chapterLink/:lessonLink',
      component: Article
    }]
  })
}