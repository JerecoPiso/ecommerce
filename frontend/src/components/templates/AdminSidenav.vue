<template>
    <div class="side-nav">
        <div class="">
            <router-link class="loginsignup-link" :to="{ name: 'Main' }"> <i class="fa fa-home"></i> <br> Home</router-link>
            <router-link class="loginsignup-link" :to="{ name: 'OurProducts' }"> <i class="fa-brands fa-product-hunt"></i> <br> Products</router-link>
            <router-link class="loginsignup-link" :to="{ name: 'CustOrders' }"><i class="fa-solid fa-bag-shopping"></i> <br> Orders</router-link>
            <router-link class="loginsignup-link"  :to="{ name: 'OurCustomers' }"> <i class="fa-solid fa-users"></i> <br> Customers</router-link>
            <router-link class="loginsignup-link"  :to="{ name: 'OurCustomers' }"> <i class="fa-solid fa-cart-shopping"></i> <br> Cart</router-link>
            <router-link class="loginsignup-link"  :to="{ name: 'NewsEvents' }"> <i class="fa-solid fa-newspaper"></i> <br> News & Events</router-link>
            <router-link class="loginsignup-link"  :to="{ name: 'AdminSettings' }"> <i class="fa-solid fa-gear"></i> <br> Settings</router-link>
            <!-- <a href=""> <i class="fa-solid fa-gear"></i> <br> Settings</a> -->
        </div>
    </div>
</template>
<script>
export default{
    name: "AdminSidenav",
    components:{

    },
    data(){
        return{

        }
    }
}
</script>
<style scoped>

.side-nav div{
    display: flex;
    flex-direction: column;
}
.side-nav div a{
    /* text-align: center; */
    height: auto;
    text-decoration: none;
    font-family: "Poppins";
    color: rgb(255,255,255);
    letter-spacing: 0.3px;
    text-align: center;
    padding: 0.8em 0 0.8em 0;
    /* padding-left: 2.2em; */
    /* padding-top: 0.8em; */
    transition: color .4s ease-in-out, box-shadow .4s ease-in-out;
   
}
.side-nav div a:hover{
    color: rgba(251,166,60,1);
    box-shadow: inset 14em 0 0 0 rgb(255,255,255);
    border-radius:5px 120px 120px 5px;

}
.side-nav div a i{
    font-size: 1.2em;
}

</style>