import Vue from 'vue';
import Router from 'vue-router';
import Home from './Home';
import IntroToProgramming from './IntroToProgramming';
import DAWeb from './DAWeb';
import PythonData from './PythonData';
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
        path: '/czechitas/uvod-do-progr',
        component: IntroToProgramming
      },
      {
        path: '/czechitas/python-data',
        component: PythonData
      },
      {
        path: '/czechitas/daweb',
        component: DAWeb
      },
      {
        path: '/:sectionLink/:courseLink/:chapterLink/:lessonLink',
        component: Article
      },
    ]
  })
}