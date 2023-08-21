<template>
    <p class="p-labels mt-1">Category: <span class="searched"> {{$route.params.category}}</span> </p>
    <FiltersProduct style="margin-top: 1.5em;" @filter="FilterProducts"></FiltersProduct>
    <div class="row">
        <ProductCard v-for="product in products" :product-id="product.id" :source="'/images/'+product.img_name" :key="product.id" :product-name="product.product_name" :price="product.price.toLocaleString('en-US')" :sold="product.sold.toString()"></ProductCard>   
    </div>
        <p v-if="products.length < 1" class="no-result">Search No Result</p>
        <p v-if="products.length < 1" class="text-center font-family sorry">We're sorry. We cannot find any matches for your search term.</p>
        <p  class="p-labels line">You may also like</p>
    <div class="row">
        <ProductCard v-for="product in suggestedProducts" :product-id="product.id" :source="'/images/'+product.img_name" :key="product.id" :product-name="product.product_name" :price="product.price.toLocaleString('en-US')" :sold="product.sold.toString()"></ProductCard>
    </div>
</template>
<script>
import axios from 'axios';
import FiltersProduct from "@/components/FiltersProduct.vue";
import ProductCard from '@/components/ProductCard.vue';
export default{
    name: "ProductCategory",
    components:{
        FiltersProduct,
        ProductCard
    },  
    created(){
        document.title = "Techworld | Category | " + this.$route.params.category;
        this.getProductByCategory()
        this.showSuggestedProductByCategory()
        this.url = axios.defaults.baseURL;
        this.$watch(
                () => this.$route.params,
                () => {
                    this.getProductByCategory()
                }
        )
    },
    data(){
        return{ 
            products: [],
            suggestedProducts: [],
            url: ""
        }
    },
    methods:{
        async getProductByCategory(){
            const response = await axios.get(`${this.url}product/category/${this.$route.params.category}`);
            if(response.statusText == "OK"){
                // console.log(response.data)
                this.products = response.data
            }
        },
        async showSuggestedProductByCategory(){
            const response = await axios.get(`${this.url}showSuggestedProductByCategory/${this.$route.params.category}`);
            if(response.statusText == "OK"){

                this.suggestedProducts = response.data
            }
        },
        FilterProducts(filterBy, value) {
            this.$router.push(`/products/category_${this.$route.params.category}/${filterBy}/${value}`)
        }
    }
}
</script>
<style scoped src="@/assets/css/users/index.css"></style>