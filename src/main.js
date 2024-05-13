import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Post from './views/Posts.vue';
import Todo from './views/Todos.vue';
// add this
import './index.css'

const routes = [
    { path: '/', component: Post},
    { path: '/todo', component: Todo},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')
