import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Posts from './views/Posts.vue';
import Todos from './views/Todos.vue';
// add this
import './index.css'

const routes = [
    { path: '/', component: Posts},
    { path: '/todos', component: Todos},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')
