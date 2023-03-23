<template>
    <div class="items-card">
        <img :src="imgSrc" alt="">
        <p class="p-name">{{pname}} <br> <span class="price">{{price}}</span>  <span class="sold">{{sold + ' Sold'}}</span>  </p>
    </div>  
</template>
<script>
export default{
    name: "TopSelling",
    props:{
        imgSrc: String,
        pname: String,
        price: String,
        sold: Number 
    },
    data(){
        return{
            
        }
    }
}
</script>
<style scoped src="@/assets/css/admin/index.css"></style>