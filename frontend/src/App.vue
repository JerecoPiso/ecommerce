<template>
  <div id="app" class="is-max-desktop">
    <router-view />
  </div>
</template>
  
<script>
// import axios from 'axios';
// import { mapMutations } from "vuex";
import 'bootstrap'
export default {
  name: "App",
  data() {
    return {
      url: ''
    }
  },
  // created(){
  //   this.url = axios.defaults.baseURL
  //  this.checkIfAuthenticated()

  // },
  // methods:{
  //   ...mapMutations(["setUser", "setToken"]),

  //   async checkIfAuthenticated(){

  //     try{
  //       if(this.$cookies.get('accessToken') != null){
  //         let data = new FormData()
  //         data.append("token", this.$cookies.get('accessToken'))
  //         const response = await axios.post(this.url+"checkIfAuthenticated", data);
  //         if(response.data.loggin !== false){
  //             const { user, secret_token } = response.data
  //             this.setUser(user);
  //             this.setToken(secret_token);

  //             this.$cookies.set('accessToken', response.data.secret_token)

  //         }
  //       }
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }
  // }
};
</script>

<style >
@import 'bootstrap/dist/css/bootstrap.min.css';

.btnLogin {
  margin-top: 1.5em;
  width: 100%;
  padding: 0.6em;
  border: none;
  border-radius: 2em;
  background-image: linear-gradient(102.2deg, rgba(251, 166, 60, 1) 1.2%, rgba(213, 57, 44, 1) 107.5%);
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  letter-spacing: 1px;
}

.form-body {
  border: 1px solid rgba(251, 166, 60, 1);
  height: 100vh;
  bottom: 0;
  height: 100vh;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: linear-gradient(102.2deg, rgba(251, 166, 60, 1) 1.2%, rgba(213, 57, 44, 1) 107.5%);
}

.login-form,
.signup-form {
  background-color: rgb(255, 255, 255);
  margin: auto;
  width: 25em;
  margin-top: 7em;
  min-height: 100px;
  border-radius: 0.3em;
  display: block;
  padding: 2em;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}</style>
