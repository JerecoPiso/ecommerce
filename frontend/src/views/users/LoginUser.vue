<template>
    <div class="form-body">
            <form class="login-form" @submit.prevent="login()">
                <label for="">Email</label>
                <input type="email" v-model="userInfo.email" required>
                <label for="" class="mt-4">Password</label>
                <input type="password" v-model="userInfo.password" required>
                <button type="submit" class="btnLogin">Login</button>
                <p class="text-center mt-4">Don't have an account? <router-link :to="{ name: 'RegisterUser' }" 
                    >Sign Up</router-link
                  > </p>
            </form>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from "sweetalert2";
import { mapMutations } from "vuex";
 export default{
    name: "LoginUser",

    data(){
        return{
            userInfo: {email: '', password: ''},
            errmsg: '',
            success: '',
            url: ""
        }
    },
    created(){
        document.title = "Techworld | Login"
        this.url = axios.defaults.baseURL
        if(this.$cookies.get('accessToken') == null){
            this.$router.push("/login");
        }else{
            this.$router.push("/user/");
        }
    },
    methods:{
        ...mapMutations(["setUser", "setToken"]),
        async login(){
        try {
                await axios.post(this.url+"loginUser", this.userInfo).then(response => {
                    const { user, secret_token } = response.data
                    this.setUser(user);
                    this.setToken(secret_token);
                    this.$cookies.set('accessToken', response.data.secret_token)
                    if(response.data.err == true){
                        Swal.fire({
                            text: response.data.message,
                            icon: response.data.responseType,
                            confirmButtonText: 'OK'
                        })
                    }else{

                        this.$router.push("/user");
                    }
                });
              
            } catch (err) {
             
                Swal.fire({    
                    text:  'An error has occured',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
      },
    }
 }
</script>
<style scoped>
    p a{
        text-decoration: none;
    }
    p a:hover{
        color: rgba(251,166,60,1);
    }

    input{
        width: 100%;
        border: none;
        border-bottom: 1px solid rgba(60, 64, 67, 0.3);
        height: 35px;
        
    }
    input:focus{
        outline: none;
        border-bottom: 2px solid rgba(251,166,60,1);
    }
</style>