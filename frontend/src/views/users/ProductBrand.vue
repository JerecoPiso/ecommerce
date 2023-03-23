<template>
    <p class="p-labels mt-1">Brand: <span class="searched"> {{$route.params.brand}}</span> </p>
    <div class="row">
        <ProductCard v-for="brand in brands" :product-id="brand.id" :source="'/images/'+brand.img_name" :key="brand.id" :product-name="brand.product_name" :price="brand.price.toLocaleString('en-US')" :sold="brand.sold.toString()"></ProductCard>
    </div>
    <p v-if="brands.length < 1" class="no-result">No result found</p>
    <p v-if="brands.length < 1" class="text-center font-family">We're sorry. We cannot find any matches for your search term.</p>    
    <p class="p-labels line">You may also like</p>
    <div class="row">
        <ProductCard v-for="brand in suggestedProductBrand" :product-id="brand.id" :source="'/images/'+brand.img_name" :key="brand.id" :product-name="brand.product_name" :price="brand.price.toLocaleString('en-US')" :sold="brand.sold.toString()"></ProductCard>
    </div>
</template>
<script>
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue';
export default{
    name: "ProductBrand",
    components:{
        ProductCard
    },  
    created(){
        document.title = "Techworld | Brand | " + this.$route.params.brand;
        this.getProductByBrand()
        this.getSuggestedProductByBrand()
        this.url = axios.defaults.baseURL;
        this.$watch(
                () => this.$route.params,
                () => {
                    this.getProductByBrand()
                }
        )
    },
    data(){
        return{ 
            brands: [],
            suggestedProductBrand: [],
            url: ""
        }
    },
    methods:{
       
        async getProductByBrand(){
            const response = await axios.get(`${this.url}product/brand/${this.$route.params.brand}`);
            if(response.statusText == "OK"){
                this.brands = response.data
            }
        },
        async getSuggestedProductByBrand(){
            const response = await axios.get(`${this.url}showSuggestedProductByBrand/${this.$route.params.brand}`);
            if(response.statusText == "OK"){
                // console.log(response.data)
                this.suggestedProductBrand = response.data
            }
        }
    }
}
</script>
<style scoped src="@/assets/css/users/index.css"></style>