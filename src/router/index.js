import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../components/profile.vue'
import Place from '../components/places.vue'
import addPlace from '../components/addplace.vue'
import {fb} from '../firebase'

Vue.use(Router)

const router = new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path:'/profile',
  name:'profile',
  component:Profile,
  meta:{requiresAuth: true},
  children:[
      {
        path: 'places',
        name:'place',
        component: Place
      },
      {
        path: 'addplace',
        name:'addplace',
        component: addPlace
      }
  ]
},

{
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: function () {
    return import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
}
]
});
router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if(requiresAuth && !currentUser){
    next('/')
  }else if(requiresAuth && currentUser){
    next()
  }else{
    next()
  }
})
export default router
