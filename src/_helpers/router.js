import Vue from 'vue';
import Router from 'vue-router';
import BabysitterCabinet from '../employee/babysitter/BabysitterCabinet.vue';
import EducatorCabinet from '../employee/educator/EducatorCabinet.vue';
import GradeBook from '../employee/educator/GradeBook';
import SecurityCabinet from '../employee/security/SecurityCabinet.vue';
import Cameras from '../employee/security/Cameras';
import TeacherCabinet from '../employee/teacher/TeacherCabinet';
import TeachersGradeBook from '../employee/teacher/GradeBook';
import ParentCabinet from '../Parent/ParentCabinet';
import CookerCabinet from '../employee/cookerCabinet/CookerCabinet';
import AddMenu from '../employee/cookerCabinet/AddMenu';
import Delivery from '../employee/cookerCabinet/Delivery';
import DoctorCabinet from '../employee/doctor/DoctorCabinet';
import MedicalBooks from '../employee/doctor/MedicalBooks';
import ChiefCabinet from '../chief/ChiefCabinet.vue';
import AddEmployee from '../chief/AddEmployee.vue';
import AddItem from '../chief/AddItem.vue';
import Messages from '../_services/Messages.vue';
import AddParent from '../chief/AddParent.vue';
import Search from '../_services/Search';
import HomePage from '../home/HomePage.vue';
import LoginPage from '../login/LoginPage.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/HomePage', component: HomePage},
        { path: '/login', component: LoginPage },
        { path: '*', redirect: '/' },
        {path: '/ChiefCabinet', component: ChiefCabinet, children: [{
                path: 'AddParent', component: AddParent,
                path: 'AddChild', component: AddEmployee,
                path: 'AddItem', component: AddItem,
                path: 'Messages', component: Messages,
                path: 'Search', component: Search
            }]},
        {path: '/BabySitterCabinet', component: BabysitterCabinet,
        children: [
            {
                path: 'Messages', component: Messages,
                path: 'Search', component: Search
            }
        ]},
        {path: '/EducatorCabinet', component: EducatorCabinet, children:
        [{
            path: 'Messages', component: Messages,
            path: 'Search', component: Search,
            path: 'GradeBook', component: GradeBook
        }]},
        {path: '/SecurityCabinet', component: SecurityCabinet, children: [{
                path: 'Messages', component: Messages,
                path: 'Search', component: Search,
                path: 'Cameras', component: Cameras
            }]},
        {path: '/TeacherCabinet', component: TeacherCabinet, children: [{
                path: 'Messages', component: Messages,
                path: 'Search', component: Search,
                path: 'GradeBook', component: TeachersGradeBook
            }]},
        {path: '/ParentCabinet', component: ParentCabinet, children:[{
                path: 'Messages', component: Messages,
                path: 'Search', component: Search,
            }]},
        {path: '/CookerCabinet', component: CookerCabinet, children: [{
                path: 'Messages', component: Messages,
                path: 'Search', component: Search,
                path: 'AddMenu', component: AddMenu,
                path: 'Delivery', component: Delivery
            }]},
        {path: '/DoctorCabinet', component: DoctorCabinet, children: [
                {
                    path: 'Messages', component: Messages,
                    path: 'Search', component: Search,
                    path: 'MedicalBooks', component: MedicalBooks
                }
            ]},
            ]});

router.beforeEach((to, from, next) => {
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
   /* if (authRequired && !loggedIn) {
        return next({
            path: '/login',
            query: { returnUrl: to.path }
        });
    } */

    next();
})