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
import MarkdownItEmoji from "markdown-it-emoji";
import YAML from "yaml";
import hljs from "highlight.js";
import slug from "slug";
import path from "path";

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
      render: function (attrs) {
        return `
          <span class="term">
            <span class="term__cs">${attrs.cs}<span class="term__icon"></span></span>
            <span class="term__en">${attrs.en}</span>
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
      .use(MarkdownItEmoji)
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
    result.anchor = "cvi-" + slug(front.title);
    result.demand = front.demand;
    result.demandText = demands[front.demand - 1];
  });

  parser.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (token.attrIndex) {
      const hrefIndex = token.attrIndex('href');
      const href = token.attrs[hrefIndex][1];
      if (href.startsWith('..')) {
        token.attrs[hrefIndex][1] = path.join('_', href);
      }
    }

    return self.renderToken(tokens, idx, options);
  };

  const defaultRender = parser.renderer.rules.image || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  parser.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (token.attrIndex) {
      const srcIndex = token.attrIndex('src');
      const src = token.attrs[srcIndex][1];

      if (src.startsWith('..')) {
        token.attrs[srcIndex][1] = path.join('_', src);
      }
    }

    return defaultRender(tokens, idx, options, env, self);
  };

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
      html: createParser(() => { }).render(sections[i], {
        tocCallback: (tocMarkdown, tocArray, tocHtml) => {
          const onlyLevel2 = tocArray.filter(item => item.level === 2);
          result.toc = [...result.toc, ...onlyLevel2];
        }
      })
    });
  }

  return result;
};
