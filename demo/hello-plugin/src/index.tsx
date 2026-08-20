import { definePlugin } from '@yolnoma/plugin-sdk';
import { HomePage } from './pages/HomePage.js';

export default definePlugin({
  id: 'com.example.hello-plugin',
  name: 'Hello Plugin',
  version: '0.2.0',
  description: 'A Yolnoma desktop application plugin',
  author: {
    name: 'Yolnoma Developer',
  },

  activate(api) {
    // Register main route
    api.router.addRoute({
      path: '/',
      component: HomePage,
      meta: {
        title: 'Hello Plugin',
      },
    });

    // Register sidebar navigation item
    api.navigation.addItem({
      label: 'Hello Plugin',
      path: '/',
    });
  },
});
