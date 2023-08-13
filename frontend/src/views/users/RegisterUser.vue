<template>
    <div class="form-body">
            <form class="signup-form" @submit.prevent="Register()">
                <p class="alert alert-danger pt-2 pb-2" v-if="errmsg">{{errmsg}} <span @click="errmsg=''">x</span> </p>
                <label for="">Email</label>
                <input type="email" v-model="userInfo.email" ref="email" required>
                <label for="" class="mt-4">Username</label>
                <input type="text" v-model="userInfo.username" required>
                <label for="" class="mt-4">Password</label>
                <input type="password" v-model="userInfo.password" required>
                <label for="" class="mt-4">Confirm Password</label>
                <input type="password" v-model="confirmPass" required>
                <button type="submit" class="btnLogin">Sign Up</button>
                <p class="text-center mt-4">Already have an account? <router-link :to="{ name: 'LoginUser', params: { redirect: 'user' } }" >Login</router-link> </p>
            </form>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from "sweetalert2";

 export default{
    name: "RegisterUser",
    data(){
        return{
            userInfo: {email: '', username: '', password: ''},
            confirmPass: "",
            errmsg: '',
            url: ""
        }
    },
    created(){
        document.title = "Techworld | Register"
        this.url = axios.defaults.baseURL
    },  
    methods: {
        async Register() {
        try {
          
            if(this.userInfo.email.length < 1){
                this.errmsg = "Email is required";
            }else if(this.userInfo.username.length < 1){
                this.errmsg = "Username is required";
            }else if(this.userInfo.password.length < 1){
                this.errmsg = "Password is required";
            }else if(this.userInfo.password != this.confirmPass){
                this.errmsg = "Password didn't match";
            }else{
                await axios.post(this.url+"createUser", this.userInfo);
                Swal.fire({
                    text: 'Signed up successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                this.$router.push("/login/user");
            }

        } catch (err) {
            
            Swal.fire({
                text:  'An error has occured',
                icon: 'error',
                confirmButtonText: 'OK'
           })
        }
      },
    }
 };
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
    p span{
        float: right;
        cursor: pointer;
    }
    p span:hover{
        color: rgb(255,255,255);
    }
</style>