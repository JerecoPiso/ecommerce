<template>
    <div class="whole">
       <div class="container bgw">
             <div class="row">
                <div class="col-xl-3">
                    <div class="profile-nav">
                        <img src="/images/john-doe.png" class="logo" alt="">
                        <p class="name">Juan Dela Cruz</p>
                        <nav>
                            <li><i class="fa fa-home"></i>
                                <router-link  :to="{ name: 'UserPage' }">Home</router-link>
                            </li>
                            <li><i class="fa-solid fa-bag-shopping"></i>
                                <router-link  :to="{ name: 'Orders' }">Orders<span class="badge">{{cartCount}}</span></router-link>
                                <!-- <a href="">Orders<span class="badge">1</span></a> -->
                            </li>
                            <li><i class="fa-solid fa-cart-shopping"></i> 
                                <router-link  :to="{ name: 'Cart' }">Cart<span class="badge">{{cartCount}}</span></router-link>
                            </li>
                            <li><i class="fa-solid fa-gear"></i>
                                <!-- <a href="">Account Settings</a> -->
                                <router-link  :to="{ name: 'Account' }">Account Settings</router-link>
                            </li>
                            <li><i class="fa-solid fa-right-from-bracket"></i><a type="button" @click="logout()" class="btn-logout">Logout</a></li>
                        </nav>
                    </div>
                </div>
                <div class="col-xl-9">
                    <div class="padding-1">
                        <router-view />
                    </div>
                </div>
             </div>
       </div>
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters, mapMutations} from 'vuex'
export default{
    name: 'UserPage',
    components:{
       // AdminCards
    },
    computed: {
      ...mapGetters(["isLoggedIn"])
       
    },
    data(){
        return{
           url :'',
           cartCount: 0,
           name: ''
           
        }
    },
    created(){
        this.url = axios.defaults.baseURL
        // this.$store.state.token = this.$cookies.get("accessToken")
        this.checkIfAuthenticated()
        if(!this.isLoggedIn){
            this.$router.push("/login");
        }
        if(this.$cookies.get('cart') != null){
            this.cartCount = this.$cookies.get('cart').length
        }
    },

    methods:{
        ...mapMutations(["setUser", "setToken"]),
        async checkIfAuthenticated(){
            try{
                if(this.$cookies.get('accessToken') != null){
                    let data = new FormData()
                    data.append("token", this.$cookies.get('accessToken'))
                    const response = await axios.post(this.url+"checkIfAuthenticated", data);
                    if(response.data.loggin !== false){
                        const { user, secret_token } = response.data
                        this.setUser(user);
                        this.setToken(secret_token)
                        this.name = this.$store.state.user.username

                        this.$cookies.set('accessToken', response.data.secret_token)
                    }
                }
            }catch(err){
                console.log(err)
            }
        },
        async logout(){
            let data = new FormData()
            data.append("token", this.$cookies.get("accessToken"))
            const response = await axios.post(this.url+"logout", data);
            if(!response.data.err){
                this.setUser(null);
                this.setToken(null)
                this.$cookies.remove("accessToken")
                this.$router.push("/login")
            }
        },   
    }
}
</script>
<style scoped src="@/assets/css/users/userpage.css"></style>