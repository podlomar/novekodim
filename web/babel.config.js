module.exports = {
  env: {
    production: {
      presets: ['@babel/preset-env'],
      plugins: [
        ['transform-define', {
          CONTENT_PATH: '/content',
        }],
      ]
    },
    development: {
      presets: ['@babel/preset-env'],
      plugins: [
        ['transform-define', {
          CONTENT_PATH: '/home/podlomar/work/projects/kodim.cz-content',
        }]
      ]
    }
  }
};