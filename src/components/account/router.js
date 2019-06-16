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
        {
            name: 'home',
            path: '/home',
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/home.vue'),
        },
        {
            name: 'article',
            path: '/home/article',
            meta: { requireAuth: true },
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/article/article.vue'),
        },
        {
            name: 'passwordReset',
            path: 'password-reset',
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/forget.vue'),
        },
        {
            name: 'person',
            path: '/home/person',
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/person/person.vue'),
        },
        {
            name: 'setting',
            path: '/home/setting',
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/setting/setting.vue'),
        },
        {
            name: 'articleDetail',
            path: '/articleDetail/:id',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/article/article-detail.vue'),
        },
        {
            name: 'articleList',
            path: '/articleList',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/article/article-list.vue'),
        },
        {
            name: 'otherPerson',
            path: '/otherPerson/:id',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/person/other_person.vue'),
        },
        {
            name: 'message',
            path: '/message',
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/chat/messageList.vue'),
        },
        {
            name: 'chat',
            path: '/chat',
            component: () =>
                import ( /* webpackChunkName: "account" */ '@/components/account/views/chat/chat.vue'),
        },
    ],
}