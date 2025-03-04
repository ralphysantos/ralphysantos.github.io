import {createWebHistory ,createRouter } from 'vue-router';
import Dashboard from './pages/Dashboard.vue';

import MasterLayout from './layout/MasterLayout.vue';

import PostIT from './pages/postIT/Index.vue';
import Login from './pages/Login.vue';

import { authMiddleware } from './middlewares/authMiddleware';

const routes = [
    {
        path: '/',
        component: MasterLayout,
        beforeEnter:authMiddleware,
        children: [
            {
                path: '',
                name: 'Home',
                component: Dashboard
            },
            {
                path:'/postit',
                name: 'Postit',
                children: [
                    {
                        path: '',
                        name: 'PostIT',
                        component: PostIT
                    }
                ],
            }
        ]
    },
    {
        path:'/login',
        name: 'Login',
        component: Login
    },
];

const router = createRouter({
    history: createWebHistory (process.env.BASE_URL),
    routes
});

export default router;