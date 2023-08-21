<template>
 <div class="product-with-label">
        <p class="p-labels mt-4 mb-2">Products</p>
        <FiltersProducts @filter="FilterProducts"></FiltersProducts>
        <div class="row clear">
            <div class="row">
                <ProductCard v-for="product in products" :product-id="product.id" :source="'/images/' + product.img_name"
                    :key="product.id" :product-name="product.product_name" :price="product.price.toLocaleString('en-US')"
                    :sold="product.sold.toString()"></ProductCard>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import FiltersProducts from "@/components/FiltersProduct.vue";
import ProductCard from '@/components/ProductCard.vue';
export default{
    name: "FilterProducts",
    components:{
        FiltersProducts,
        ProductCard
    },
    data(){
        return{
            products: [],
            url: ''
        }
    },
    created(){
        document.title = "Techworld | Products"
        this.GetProducts()
        this.url = axios.defaults.baseURL
        // this.$watch(
        //         () => this.$route.params,
        //         () => {
        //             this.FilterProducts(this.$route.params.product)
        //         }
        // )
    },
    methods:{
        async GetProducts() {
            try {
                const response = await axios.get(this.url + "admin/showProducts");
                this.products = response.data;
            } catch (err) {
                console.log(err)
            }
        },
        FilterProducts(filterBy, value) {
           // alert(filterBy+"--"+value)
            this.$router.push(`/products/brand_${this.$route.params.product}/${filterBy}/${value}`)
        }
    }
}

</script>
<style scoped src="@/assets/css/users/allproducts.css"></style>
<style scoped src="@/assets/css/users/index.css"></style>