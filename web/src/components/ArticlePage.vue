<template>
  <Page>
    <template v-slot:main>
      <div class="container">
        <aside class="aside">
          <slot name="uplink"></slot>
          <slot name="outline"></slot>
        </aside>
        <article class="article">
          <div class="article-head">
            <div class="article-head__title">
              <div class="article-head__num">
                <slot name="num"></slot>
              </div>
              <h1>
                <slot name="title"></slot>
              </h1>
            </div>
            <div class="article-head__brief">
              <slot name="brief"></slot>
            </div>
          </div>
          <div class="article-links">
            <slot name="links"></slot>
          </div>
          <div class="article-body">
            <slot name="articleBody"></slot>
          </div>
        </article>
      </div>
    </template>
  </Page>
</template>

<script>
import Page from './Page';

export default {
  components: {
    Page,
  },
};
</script>

<style lang="scss">
.article-head {
  padding: 0 4rem;

  &__title {
    display: flex;
    align-items: baseline;
    font-size: 1.8rem;
    font-weight: bold;

    margin-left: -6rem;

    h1 {
      font-size: 100%;
    }
  }

  &__num {
    width: 4rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    background-color: #ffec88;
    box-shadow: 0 0 10px #ddd;

    border-radius: 2rem;
    margin-right: 2rem;
  }
}

.aside {
  display: none;
  width: 320px;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  padding-top: 20px;

  @include breakpoint-lg {
    display: block;
  }
}

.article {
  margin: 0rem 0 6rem 0;
  background-color: white;
  padding-top: 2rem;
  box-shadow: 0 0 10px #ddd;
  line-height: 150%;
  border-radius: 1rem;

  @include breakpoint-lg {
    margin: 0rem 0 6rem 320px;
  }

  .text-section > p,
  .text-section > ul,
  .text-section > ol,
  .text-section > dl {
    margin-left: 4rem;
    margin-right: 4rem;
  }

  dt,
  dd {
    margin-bottom: 0.5rem;
  }

  h2,
  h3,
  h4 {
    padding: 1rem 4rem;
  }

  .anchor {
    opacity: 0;
    transition: 250ms;
    text-decoration: none;
    color: #869af5;
    margin-left: -1.7rem;
  }

  h2 {
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: 900;

    .anchor {
      margin-left: -1.7rem;
    }
  }

  h3 {
    margin-top: 1rem;
    margin-bottom: 0rem;

    .anchor {
      margin-left: -1.2rem;
    }
  }

  h2:hover,
  h3:hover {
    .anchor {
      opacity: 1;
      margin-left: 0;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
    hyphens: manual;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .text-section:first-child {
    p:first-child:first-letter {
      float: left;
      font-size: 5rem;
      line-height: 4rem;
      padding-top: 0.3rem;
      padding-right: 0.5rem;
    }
  }

  em {
    background-color: $color-textbg-em;
    padding: 0rem 0.5rem;
    border-radius: 10px;
  }

  pre,
  code,
  var {
    font-family: 'Roboto Mono';
  }

  pre {
    background-color: $color-bg-pre;
    color: white;
    padding: 1rem 4rem;
    margin: 2rem 0;
    overflow-x: auto;
  }

  var {
    font-style: normal;
    color: blue;
  }

  kbd {
    font-family: 'Montserrat';
    background-color: $color-white;
    border: 1px solid $color-gray-8;
    border-radius: 4px;
    padding: 0rem 0.5rem;
  }

  blockquote {
    background-color: #f5f5f5;
    padding: 2rem 4rem 1rem 4rem;
    margin: 0 0 1rem 0;
    border-left: 2px solid black;
  }

  .video-16-9 {
    width: 100%;
    height: 0;
    padding-top: 56.25%;
    margin-top: 2rem;
    background-color: black;
    position: relative;

    iframe {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.term {
  display: inline;
  position: relative;
  font-style: italic;
  overflow: visible;

  &__icon {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    margin-left: 0.5rem;
    margin-bottom: 2px;
    margin-right: 0;
    background-image: url('../assets/img/english.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  &__cs {
    background-color: $color-textbg-em;
    padding: 0rem 0rem 0rem 0.5rem;
    border-radius: 10px;
    white-space: pre;
    cursor: default;
  }

  &__en {
    position: absolute;
    top: -2rem;
    left: 0rem;
    background-color: #444;
    color: white;
    padding: 0rem 0.5rem;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    z-index: 1;
    white-space: pre;
    transition: 500ms;
  }

  &:hover &__en {
    visibility: visible;
    opacity: 1;
  }
}
</style>
