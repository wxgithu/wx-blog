// import Vue from 'vue'
// import Router from 'vue-router'

// import Cover from '../components/cover/cover.vue'
// Vue.use(Router)

// export default new Router({
//     linkExactActiveClass: 'active',
//     routes: [{
//         path: '/',
//         name: 'Cover',
//         component: Cover
//     }],
//     mode: 'history'
// })
import Vue from 'vue';
import Router from 'vue-router';
import accountRouter from '@/components/account/router';
// import userRouter from '@/apps/user/router';
// import trainRouter from '@/apps/train/router';
// import userManageRouter from '@/apps/team/router';
// import mobileRouter from '@/apps/mobile/router';
// import dataManageRouter from '@/apps/data-manage/router';
// import datasetRouter from '@/apps/dataset/router';
// import statisticRouter from '@/apps/statistic/router';
// import engineeringRouter from '@/apps/engineering/router';
// import documentationRouter from '@/apps/documentation/router';
// import roleRouter from '@/apps/role/router';
// import modelRouter from '@/apps/model/router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        accountRouter,
        // userRouter,
        // trainRouter,
        // userManageRouter,
        // mobileRouter,
        // dataManageRouter,
        // datasetRouter,
        // statisticRouter,
        // engineeringRouter,
        // documentationRouter,
        // roleRouter,
        // modelRouter,
        { path: '*', redirect: '/' },
    ],
});