<template>
    <div class="product-with-label">
        <p class="p-labels mt-4 mb-2">Products</p>
        <FiltersProducts @filter="FilterProducts" :min="min" :max="max"></FiltersProducts>
        <p v-if="products.length < 1" class="no-result">No result found</p>
        <p v-if="products.length < 1" class="text-center font-family">We're sorry. We cannot find any matches for your search
            term.</p>
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
export default {
    name: "FilterProducts",
    components: {
        FiltersProducts,
        ProductCard
    },
    data() {
        return {
            products: [],
            url: '',
            min: '',
            max: ''
        }
    },
    created() {
        if(this.$route.params.filterby == "pricerange"){
            const minMax = this.$route.params.value.split("-")
            this.min = minMax[0];
            this.max = minMax[1]
        }
 
        document.title = "Techworld | Products";
        this.url = axios.defaults.baseURL;
        this.GetProducts();
        this.$watch(
            () => this.$route.params,
            () => {
                if(this.$route.name === "FilterProducts"){
                    this.GetProducts()
                }
            }
        )
    },
    methods: {
        async GetProducts() {
            try {
                let data = new FormData();
                data.append("product", this.$route.params.product);
                data.append("filterby", this.$route.params.filterby);
                data.append("value", this.$route.params.value);
                const response = await axios.post(this.url + "filterProducts", data);
                this.products = response.data;
            } catch (err) {
                console.log(err)
            }
        },
        FilterProducts(filterBy, value) {
            this.$router.push(`/products/${this.$route.params.product}/${filterBy}/${value}`)
        }
    }
}
</script>
<style scoped src="@/assets/css/users/allproducts.css"></style>
<style scoped src="@/assets/css/users/index.css"></style>