<template>
    <form @submit.prevent="FilterProducts('pricerange', minimunPrice + '-' + maximumPrice)">
        <input type="number" class="min" placeholder="Min" v-model="minimunPrice" required>
        <input type="number" class="max" placeholder="Max" v-model="maximumPrice" required>
        <button type="submit" class="go"><i class="fa-solid fa-circle-arrow-right"></i></button>
        <select class="filter">
            <option selected disabled>Filter</option>
            <option value="0">Price Highest to Lowest </option>
            <option value="1">Price Lowest to Highest </option>
            <option value="2">Sold Highest to Lowest</option>
            <option value="3">Sold Lowest to Highest </option>
        </select>
    </form>
</template>
<script>
export default {
    name: "FiltersProduct",

    data() {
        return {
            minimunPrice: '',
            maximumPrice: ''
        }
    },
    emits: ["filter"],
    methods: {
        FilterProducts(filterBy, value) {
            this.$emit("filter", filterBy, value)
            // this.$router.push(`/products/all/${filterBy}/${value}`)
        }
    }
}
</script>
<style scoped src="@/assets/css/users/allproducts.css"></style>
<style scoped src="@/assets/css/users/index.css"></style>