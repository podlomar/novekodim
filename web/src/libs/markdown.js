import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import MarkdownItFrontMatter from "markdown-it-front-matter";
import MarkdownItAttrs from "markdown-it-attrs";
import MarkdownItKbd from "markdown-it-kbd";
import MarkdownItTocAndAnchor from "markdown-it-toc-and-anchor";
import MarkdownItBlockImage from "markdown-it-block-image";
import MarkdownItCustomBlock from "markdown-it-custom-block";
import MarkdownItShortcodeTag from "markdown-it-shortcode-tag";
import MarkdownItDeflist from "markdown-it-deflist";
import YAML from "yaml";
import hljs from "highlight.js";
import slug from "slug";

slug.defaults.mode = "rfc3986";

hljs.registerLanguage("pycon", hljs => ({
  contains: [
    {
      className: "meta",
      begin: "^>>>",
      starts: {
        end: "$",
        subLanguage: "python"
      }
    }
  ]
}));

hljs.registerLanguage("jscon", hljs => ({
  contains: [
    {
      className: "meta",
      begin: "^>",
      starts: {
        end: "$",
        subLanguage: "javascript"
      }
    }
  ]
}));

// hljs.addPlugin({
//   'after:highlightBlock': ({ block, result }) => {
//     console.log(block);
//     console.log(result);
//   }
// });

const createParser = frontMatterCallback => {
  const shortcodes = {
    term: {
      render: function(attrs) {
        console.log(attrs);
        return `
          <span class="term">
            <span class="term__cs">${attrs.cs}</span>
            <span class="term__en">angl: ${attrs.en}</span>
          </span>
        `;
      }
    }
  };

  return (
    new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(lang, str).value;
        }

        if (lang === "shell") {
          console.log(`a${lang}a`);
          console.log(shlt.highlight(lang, str));
          return shlt.highlight(lang, str);
        }
        return ""; // use external default escaping
      }
    })
      .use(MarkdownItShortcodeTag, shortcodes)
      .use(MarkdownItAttrs)
      .use(MarkdownItKbd)
      .use(MarkdownItTocAndAnchor, {
        anchorLinkSymbol: "¶",
        tocFirstLevel: 2,
        tocLastLevel: 2,
        anchorClassName: "anchor",
        slugify: str => slug(str)
      })
      .use(MarkdownItBlockImage, {
        outputContainer: "div",
        containerClassName: "block-image"
      })
      // .use(MarkdownItCustomBlock, {
      //   term(arg) {
      //     const [cz, en] = arg.split("|");

      //     return `
      //       <span class="term">
      //         <span class="term__cz">${cz}</span>
      //         <span class="term__en">${en}</span>
      //       </span>
      //     `;
      //   }
      // })
      .use(MarkdownItFrontMatter, frontMatterCallback)
      .use(MarkdownItDeflist)
  );
};

const demands = [
  "pohodička",
  "to dáš",
  "zapni hlavu",
  "zavařovačka",
  "smrt v přímém přenosu"
];

export const parseExercise = content => {
  const result = {
    title: null,
    demand: 1
  };

  const parser = createParser(fm => {
    const front = YAML.parse(fm);
    result.title = front.title;
    result.anchor = "exrc-" + slug(front.title);
    result.demand = front.demand;
    result.demandText = demands[front.demand - 1];
  });

  result.html = parser.render(content);
  return result;
};

const numberExercises = (start, list) => {
  const numbered = list.map((exrc, index) => ({
    num: start + index,
    link: exrc
  }));

  return {
    numbered,
    last: start + list.length
  };
};

export const parseLesson = content => {
  const result = {
    title: null,
    sections: [],
    toc: []
  };

  const sections = content.split(/(@[a-z]+)( [^\]]+)?\[([^\]]*)\]@/s);

  let exrcNumStart = 1;

  for (let i = 0; i < sections.length; i += 1) {
    console.log(result.toc);
    const term = sections[i].trim();
    if (term === "") {
      continue;
    }

    if (term === "@exercises") {
      i += 1;
      let title = sections[i];
      let slugTitle;
      let level;

      if (title !== undefined) {
        title = title.trim();

        if (title.startsWith("##")) {
          title = title.substring(2).trim();
          slugTitle = slug(title);
          level = 2;
          result.toc.push({
            content: title,
            anchor: slugTitle,
            level
          });
        }
      }

      i += 1;
      const { numbered, last } = numberExercises(
        exrcNumStart,
        YAML.parse(sections[i])
      );
      exrcNumStart = last;

      result.sections.push({
        type: term,
        data: numbered,
        title,
        anchor: slugTitle,
        level
      });
      continue;
    }

    result.sections.push({
      type: "@text",
      html: createParser(() => {}).render(sections[i], {
        tocCallback: (tocMarkdown, tocArray, tocHtml) => {
          const onlyLevel2 = tocArray.filter(item => item.level === 2);
          result.toc = [...result.toc, ...onlyLevel2];
        }
      })
    });
  }

  return result;
};
