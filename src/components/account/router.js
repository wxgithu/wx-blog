export default {
    path: '/',
    redirect: 'cover',
    component: () =>
        import ( /* webpackChunkName: "account" */ '@/App.vue'),
    children: [{
            name: 'cover',
            path: 'cover',
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/cover.vue'),
        },
        {
            name: 'login',
            path: '/login/:name',
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/login.vue'),
        },
        // {
        //     name: 'register',
        //     path: '/register:name',
        //     component: () =>
        //         import ( /* webpackChunkName: "account" */ '@/components/account/views/login.vue'),
        // },
        // {
        //     name: 'passwordReset',
        //     path: 'password-reset',
        //     component: () =>
        //         import ( /* webpackChunkName: "account" */ '@/apps/account/views/reset-password.vue'),
        // },
        // {
        //     name: 'main',
        //     path: 'main/:menuType',
        //     component: () =>
        //         import ( /* webpackChunkName: "account" */ '@/apps/account/views/main.vue'),
        //     redirect: '/home',
        // },
    ],
};