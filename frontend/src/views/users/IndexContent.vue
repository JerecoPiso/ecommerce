<template>
    <div id="demo" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="/images/Apple-Event-1.png" alt="Los Angeles" class="d-block">
                <div class="carousel-caption">
                    <h3>Los Angeles</h3>
                    <p>We had such a great time in LA!</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/images/Lenovo_Legion_Event_2.jpg" alt="Chicago" class="d-block">
                <div class="carousel-caption">
                  <h3>Los Angeles</h3>
                  <p>We had such a great time in LA!</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/images/examples-of-product-launches.jpg " alt="New York" class="d-block">
                <div class="carousel-caption">
                    <h3>Los Angeles</h3>
                    <p>We had such a great time in LA!</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
        </button>
    </div>
    <div class="product-with-label">
        <p class="p-labels line">Popular</p>
            <div class="row">
                <ProductCard v-for="product in popularProducts" :product-id="product.id" :source="'/images/'+product.img_name" :key="product.id" :product-name="product.product_name" :price="product.price.toLocaleString('en-US')" :sold="product.sold.toString()"></ProductCard>
            </div>
            <p class="p-labels line">Recent</p>
            <div class="row">
                <ProductCard v-for="product in products" :product-id="product.id" :source="'/images/'+product.img_name" :key="product.id" :product-name="product.product_name" :price="product.price.toLocaleString('en-US')" :sold="product.sold.toString()"></ProductCard>
            </div>
    </div>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue';

import axios from 'axios';
export default{
    name: "IndexContent",
    components: {
       ProductCard,

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