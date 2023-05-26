import { createRouter, createWebHistory } from 'vue-router'
// ADMIN
import AdminSettings from '@/views/admin/AdminSettings.vue'
import CustomerOrders from '@/views/admin/CustomerOrders.vue'
import DashBoard from '@/views/admin/DashBoard.vue'
import MainPage from '@/views/admin/MainPage.vue'
import NewsEvents from '@/views/admin/NewsEvents.vue'
import OurProducts from '@/views/admin/OurProducts.vue'
import OurCustomers from '@/views/admin/OurCustomers.vue'
// USERS
import AccountSettings from '@/views/users/loggineduser/AccountSettings.vue'
import AllProducts from '@/views/users/AllProducts.vue'
import IndexPage from '@/views/users/IndexPage.vue'
import IndexContent from '@/views/users/IndexContent.vue'
import LoginUser from '@/views/users/LoginUser.vue'
// import MinMax from '@/views/users/ProductsMinmax.vue'
import MyCart from '@/views/users/loggineduser/MyCart.vue'
import MyOrders from '@/views/users/loggineduser/MyOrders.vue'
import ProductCategory from '@/views/users/ProductCategory.vue'
import ProductBrand from '@/views/users/ProductBrand.vue'
import RegisterUser from '@/views/users/RegisterUser.vue'
import UserPage from '@/views/users/loggineduser/UserPage.vue'
import ViewProduct from '@/views/users/ViewProduct.vue'

import PagenotFound from '@/components/templates/PagenotFound.vue'
const routes = [
  { 
    name: 'LoginUser',
    path: '/login/:redirect',
    component: LoginUser
  },
  {
    name: 'RegisterUser',
    path: '/register',
    component: RegisterUser
  },
  {
    name: 'Index',
    path: '/',
    component: IndexPage,
    children: [
      { name: 'MainContent', path: '', component: IndexContent},
      { name: 'AllProducts', path: 'products', component: AllProducts},
      { name: 'Product', path: 'product/:id', component: ViewProduct},
      { name: 'ProductCategory', path: 'product/category/:category', component: ProductCategory},
      { name: 'ProductBrand', path: 'product/brand/:brand', component: ProductBrand}
    ]
  },
  {
    name: 'DashBoard',
    path: '/admin/',
    component: DashBoard,
    children: [
      { name: 'Main', path: '', component: MainPage  },
      { name: 'OurProducts', path: 'products', component: OurProducts  },
      { name: 'CustOrders', path: 'orders', component: CustomerOrders  },
      { name: 'OurCustomers', path: 'customers', component: OurCustomers  },
      { name: 'NewsEvents', path: 'newsandevents', component: NewsEvents  },
      { name: 'AdminSettings', path: 'settings', component: AdminSettings  },
    ],
  },
  {
    name: 'UserPage',
    path: '/user/',
    component: UserPage,
    children: [
      { name: 'Cart', path: 'cart', component: MyCart  },
      { name: 'Account', path: 'accountsettings', component: AccountSettings  },
      { name: 'Orders', path: 'myorders', component: MyOrders  },
    ],
  },
  //404 not found page
  { path: '/:pathMatch(.*)', component: PagenotFound }
];
//process.env.BASE_URL
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
export default router
