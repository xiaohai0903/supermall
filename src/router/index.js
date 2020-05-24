import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const Home = () => import('@/views/home/Home.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const Category = () => import('@/views/category/Category.vue')
const Profile = () => import('@/views/profile/Profile.vue')
const Detail = () => import('@/views/detail/Detail.vue')


Vue.use(VueRouter)


const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path: '/home',
            component:Home,
            meta:{
                title:'首页'
            }
        },
        {
            path: '/cart',
            component:Cart
        },
        {
            path: '/category',
            component:Category
        },
        {
            path: '/profile',
            component:Profile
        },
        {
            path: '/detail',
            component:Detail
        }
    ],
    mode:'history'
})

export default router
