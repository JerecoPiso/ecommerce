<template>
    <PageHeader></PageHeader>   
    <div class="container">
        <router-view/>
    </div>
    <PageFooter></PageFooter>
</template>
<script>
import PageHeader from '@/components/templates/PageHeader.vue';
import PageFooter from '@/components//templates/PageFooter.vue';
import axios from 'axios';
export default{
    name: "IndexPage",
    components: {
        PageFooter,
        PageHeader
    },
    data(){
        return{
            products: [],
            popularProducts: [],
            url: ''
        }
    },
    created(){
        document.title = "Techworld | Home"
        this.getRecentProducts()
        this.getPopularProducts()
        this.url = axios.defaults.baseURL
    },
    methods:{
        async getRecentProducts(){
          try{
            const response =  await axios.get(this.url+"/getRecentProducts");
            this.products = []
            this.products = response.data
          }catch(err){
            console.log(err)
          }
        },
        async getPopularProducts(){
          try{
            const response =  await axios.get(this.url+"getPopularProduct");
            this.popularProducts = []
            // console.log(response.data)
            this.popularProducts = response.data
          }catch(err){
            console.log(err)
          }
        }
    }
}
</script>
<style scoped src="@/assets/css/users/index.css"></style>