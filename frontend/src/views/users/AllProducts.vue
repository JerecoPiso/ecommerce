<template>
    <div class="product-with-label">
        <p class="p-labels mt-4 mb-2">Products</p>
        <FiltersProduct @filter="FilterProducts"></FiltersProduct>
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
import FiltersProduct from "@/components/FiltersProduct.vue";
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios';
export default {
    name: "AllProducts",
    components: {
        FiltersProduct,
        ProductCard
    },
    created() {
        document.title = "Techworld | Products"
        this.GetFilteredProducts()
        this.url = axios.defaults.baseURL
    },
  
    data() {
        return {
            products: [],
            url: '',
            minimunPrice: '',
            maximumPrice: ''
        }
    },
    methods: {
        async GetFilteredProducts() {
            try {
                const response = await axios.get(this.url + "admin/showProducts");
                this.products = response.data;
            } catch (err) {
                console.log(err)
            }
        },
        FilterProducts(filterBy, value) {
            this.$router.push(`/products/all/${filterBy}/${value}`)
        }
    }
}
</script>
<style scoped src="@/assets/css/users/allproducts.css"></style>
<style scoped src="@/assets/css/users/index.css"></style>
