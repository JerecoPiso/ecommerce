<template>
    <form @submit.prevent="FilterProducts('pricerange', minimunPrice + '-' + maximumPrice)">
        <input type="number" class="min" placeholder="Min" v-model="minimunPrice" required>
        <input type="number" class="max" placeholder="Max" v-model="maximumPrice" required>
        <button type="submit" class="go"><i class="fa-solid fa-circle-arrow-right"></i></button>
        <select class="filter" @change="FilterProducts((sortby== '1' || sortby == '2' ?  'price' : 'sold'), sortby)" v-model="sortby">
            <option selected disabled value="0">Sort by</option>
            <option value="1">Price Lowest to Highest </option>
            <option value="2">Price Highest to Lowest </option>
            <option value="3">Sold Lowest to Highest </option>
            <option value="4">Sold Highest to Lowest</option>
        </select>
    </form>
</template>
<script>
export default {
    name: "FiltersProduct",
    props: {
        min: String,
        max: String
    },
    data() {
        return {
            minimunPrice: this.min,
            maximumPrice: this.max,
            sortby: '0'
        }
    },
    emits: ["filter"],
    methods: {
        FilterProducts(filterBy, value) {
            
            if(filterBy == "price"){
                value = (value == '1' ? "asc" : "desc");
            }
            if(filterBy == "sold"){
                value = (value == '3' ? "asc" : "desc");
            }
            this.$emit("filter", filterBy, value)
        }
    }
}
</script>
<style scoped src="@/assets/css/users/allproducts.css"></style>
<style scoped src="@/assets/css/users/index.css"></style>