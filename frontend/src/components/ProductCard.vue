<template>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-6">
       
        <div class="product mt-4">
            <router-link :to="{ name: 'Product', params: { id: productId } }">
                <img :src="source" alt="">
                <p class="prod-name"> {{ productName }} </p>
                <p class="price-sold">₱ {{ price }} <span>{{ sold }} Sold</span> </p>
            </router-link>
        </div>
    </div>
</template>
<script>
export default{
    name: "ProductCard",
    props: {
        productName: String,
        price: String,
        sold: String,
        source: String,
        productId: Number
    },
    methods:{
       
    }
}
</script>
<style scoped src="../assets/css/users/index.css"></style>