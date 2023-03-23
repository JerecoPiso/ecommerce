<template>
    <PageHeader></PageHeader>
    <div class="container">
        <div class="product-with-label">
            <p class="p-labels mt-4 mb-2">Products</p>
            <form action="">
                <input type="number" class="min" placeholder="Min"><input type="number" class="max" placeholder="Max"><button type="button" class="go"><i class="fa-solid fa-circle-arrow-right"></i></button>
                <select class="filter">
                    <option selected disabled>Filter</option>
                    <option>Price Highest to Lowest </option>
                    <option>Price Lowest to Highest </option>
                    <option>Sold Highest to Lowest</option>
                    <option>Sold Lowest to Highest </option>
                </select>
            </form>
            <div class="row clear">
                <div class="row">
                    <ProductCard v-for="product in products" :product-id="product.id" :source="'/images/'+product.img_name" :key="product.id" :product-name="product.product_name" :price="product.price.toLocaleString('en-US')" :sold="product.sold.toString()"></ProductCard>
                </div>
            </div>
        </div>
    </div>
    <PageFooter></PageFooter>
</template>
<script>
import PageHeader from '@/components/templates/PageHeader.vue';
import PageFooter from '@/components/templates/PageFooter.vue';
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios';
export default{
    name: "MinMax",
    components:{
        PageHeader,
        PageFooter,
        ProductCard
    },  
    created(){
        document.title = "Techworld | Products"
        this.GetProducts()
        this.url = axios.defaults.baseURL
    },
    data(){
        return{
            products: [],
            url: ''
        }
    },
    methods:{
        async GetProducts(){
            try{
                const response = await axios.get(this.url+"admin/showProducts");
                this.products = response.data;
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>
<style scoped src="@/assets/css/users/allproducts.css"></style>
<style scoped src="@/assets/css/users/index.css"></style>
