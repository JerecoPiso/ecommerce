<template>
    <div class="header">
        <p class="logo">techworld.</p>
        <p class="login-reg-cart"> 
            <router-link class="loginsignup-link"  v-if="!isLoggedIn" :to="{ name: 'LoginUser', params: { redirect: 'user' } }">  Login</router-link> <span v-if="!isLoggedIn">| </span>  
            <router-link class="loginsignup-link"  v-if="!isLoggedIn" :to="{ name: 'RegisterUser' }">Register</router-link>
            <router-link class="cart-link" v-if="isLoggedIn"  :to="{ name: 'UserPage' }"><i class="fa-solid fa-user"></i></router-link> <span v-if="isLoggedIn"> | </span>  
            <a href="javascript:void(0)" @click="logout()" v-if="isLoggedIn" class="btn-logout "><i class="fa-solid fa-right-from-bracket"></i> </a>
            <i class="fa-solid fa-magnifying-glass ps-2 " @click="showSearch = true;"></i>
        </p>
     </div>
     <Transition name="slide-fade">
        <div class="search-bar" v-if="showSearch">
            <button type="button" id="x"><i class="fa-sharp fa-solid fa-xmark" @click="showSearch = false;"></i></button>
            <div class="search-input">
                <input type="text" placeholder="Search here . . ."> <button><i class="fa-solid fa-magnifying-glass ps-2 "></i></button>
            </div>
         </div>
     </Transition>
     <nav class="links">
         <ul class="main-nav"> 
             <li> <router-link :to="{name: 'MainContent'}">Home</router-link> </li>
             <li @mouseover="showCategories = true" @mouseleave="showCategories = false"> <a href="javascript:void(0)">Categories</a>
                <Transition name="slide-fade">
                    <div class="nav-hover-popup" id="category-list" v-if="showCategories">
                        <router-link v-for="c in category" :key="c.id" :to="{name: 'ProductCategory', params: { category: c.category } }">{{c.category}}</router-link> 
                    </div>
                  </Transition>
              </li>
             <li @mouseover="showBrands = true" @mouseleave="showBrands = false"> <a href="javascript:void(0)">Brands</a>
                <Transition name="slide-fade">
                    <div class="nav-hover-popup" v-if="showBrands">
                        <router-link v-for="b in brands" :key="b.id" :to="{name: 'ProductBrand', params: { brand: b.brand } }">{{b.brand}}</router-link> 
                    </div>
                </Transition>
             </li>
             <li> <router-link :to="{name: 'AllProducts'}">Products</router-link> </li>
         </ul>
     </nav>
</template>
<script>
// import Swal from 'sweetalert2'
import axios from 'axios'
import { mapGetters} from 'vuex'
export default{
    name: 'PageHeader',
    data(){
        return{
            showCategories: false,
            showBrands: false,
            showSearch: false,
            category: [],
            brands: [],
            url: "",
        }
    },
    computed: {
      ...mapGetters(["isLoggedIn"])
    },
    created(){
        this.getCategory()
        this.getBrands()
        this.url = axios.defaults.baseURL;
        this.$store.state.token = this.$cookies.get("accessToken")
    },
    methods:{
        async logout(){
            let data = new FormData()
            data.append("token", this.$cookies.get("accessToken"))
            const response = await axios.post(this.url+"logout", data);
            if(!response.data.err){
                this.$cookies.remove("accessToken")
                this.$router.push("/login")
            }
        },        
        async getBrands(){
          try{
            const response =  await axios.get(this.url+"admin/showBrands");
            this.brands = []
            this.brands = response.data
          }catch(err){
            console.log(err)
          }
        },
        async getCategory(){
          try{
            const response =  await axios.get(this.url+"admin/showCategory");
            if(response.statusText == "OK"){
                this.category = []
                this.category = response.data
            }
          }catch(err){
            console.log(err)
          }
        },
    }
}
</script>
<style scoped src="@/assets/css/users/index.css"></style>
