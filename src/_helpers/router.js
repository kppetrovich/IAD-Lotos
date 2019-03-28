import Vue from 'vue';
import Router from 'vue-router';
import ChiefCabinet from '../chief/ChiefCabinet.vue';
import HomePage from '../home/HomePage.vue'
import LoginPage from '../login/LoginPage.vue'
import AddParent from '../chief/AddParent.vue';
import BabysitterCabinet from '../employee/babysitter/BabysitterCabinet.vue';
import EducatorCabinet from '../employee/educator/EducatorCabinet.vue'
Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: EducatorCabinet,  children: [{
                path: 'AddParent', component: AddParent
             }]},
        { path: '/login', component: LoginPage },
        { path: '*', redirect: '/' },
        {path: '/ChiefCabinet/', component: ChiefCabinet, children: [{
                path: 'AddParent', component: AddParent
            },
                {path: '/BabysitterCabinet', component: BabysitterCabinet}
    ]
}]});

router.beforeEach((to, from, next) => {
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        return next({
            path: '/',
            query: { returnUrl: to.path }
        });
    }

    next();
})