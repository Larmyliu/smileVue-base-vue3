import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import Main from "@/views/Main.vue"
// import ShoppingMall from '@/views/ShoppingMall.vue'
const ShoppingMall = () => import('@/views/ShoppingMall.vue'); // 首页
import test from "@/views/test.vue"
const routes: Array < RouteRecordRaw > = [{
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: "Main",
    component: Main,
    children: [{
        path: '',
        name: 'ShoppingMall',
        component: ShoppingMall
      },
      {
        path:'test',
        name:'test',
        component: test
      }
      // {path:'/CategoryList',name:'CategoryList',component:CategoryList},
      // {path:'/Cart',name:'Cart',component:Cart},
      // {path:'/Member',name:'Member',component:Member},
    ]
  },
  // {
  //   path:'/shoppingMall',
  //   name:'ShoppingMall',
  //   component:ShoppingMall
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router