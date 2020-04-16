import Vue from 'vue';
import Express from 'express';
import * as VueServerRenderer from 'vue-server-renderer';
import App from './App';
import template from 'raw-loader!./index.html';
import {
  createRouter
} from './pages/router.js';

const createApp = () => {
  const router = createRouter();
  const app = new Vue({
    router,
    render: h => h(App),
  });

  return {
    app,
    router
  };
};

const serveApp = context => {
  return new Promise((resolve, reject) => {
    const {
      app,
      router
    } = createApp();
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({
          code: 404
        });
      }

      resolve(app);
    }, reject);
  });
}

const renderer = VueServerRenderer.createRenderer({
  template
});

const server = Express();

server.get('*', (req, res) => {
  serveApp({
    url: req.url
  })
    .then(app => {
      renderer.renderToString(app, (err, html) => {
        if (err) {
          if (err.code === 404) {
            res.status(404).end('Page not found')
          } else {
            res.status(500).end('Internal Server Error')
          }
        } else {
          res.end(html)
        }
      })
    })
    .catch(err => {
      console.log(err)
    });
});

server.listen(3000);