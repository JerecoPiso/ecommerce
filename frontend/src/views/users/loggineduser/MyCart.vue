<template>
    <p class="page-title">Cart</p>
    <div class="table-responsive">
        <table class="table table-hover table-bordered">
               <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
               </thead>
               <tbody>
                    <CartItems v-for="p, index in products" :key="p.id" :id="p.id" :price="p.price" :qty="p.qty" :productName="p.product_name" :image="p.image" :stocks="p.stocks" @unselectitem="unselectitem(p.id)" @selectitem="select(index);"  @remove="products.splice(index,1);unselectitem(p.id);"></CartItems> 
               </tbody>
        </table>
    </div>
    <p v-if="products.length < 1" class="text-center no-item">No Item On Cart</p>
    <RouterLink v-if="products.length < 1" :to="{ name: 'AllProducts' }" class="show-now">Shop Now </RouterLink>     
    <div class="order-summary ">
        <p class="p-labels mt-2 mb-2">Order Summary</p>
        <p class="total">Total Items <span>{{totalItem}}</span> </p>
        <p class="total">Total Amount <span> ₱ {{totalAmount.toLocaleString('en-us')}}</span></p>
        <button type="button" class="btn-checkout" @click="Save()">Checkout </button>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
import CartItems from '@/components/CartItems.vue';
import axios from 'axios';
export default{
    name: "MyCart",
    components:{
        CartItems,
    },
    data(){
        return{
            quantity: 0,
            products: [],
            selectedItems: [],
            totalItem: 0,
            totalAmount: 0,
            url: '',
        }
    },
    created(){
        document.title = "Techworld | Cart"
        if(this.$cookies.get('cart') != null){
            this.$cookies.get('cart').forEach(el => {
               this.products.push(el)
            });
        }
        this.url = axios.defaults.baseURL

        // if(this.$cookies.get('accessToken') == null){
        //     this.$router.push("/login");
        // }
    },
    methods:{
        select(index){
            if(this.$cookies.get('cart') != null){
                this.totalItem = 0
                this.totalAmount = 0
                var product = this.$cookies.get("cart");
                var checker = false
                this.selectedItems.forEach(el => {
                    if(el.id == product[index].id){
                        checker = true
                        el.qty = product[index].qty
                    }
                });
                if(!checker){
                    this.selectedItems.push(product[index])
                }
                this.selectedItems.forEach(el => {
                    this.totalItem += el.qty
                    this.totalAmount += parseInt(el.qty) * parseInt(el.price)
                });
            }
        },
        unselectitem(id){
            if(this.$cookies.get('cart') != null){
                var ctr = 0;
                var index = 0;
                this.selectedItems.forEach(el => {
                    if(el.id == id){
                        index = ctr;
                        this.totalItem -= el.qty
                        this.totalAmount -= parseInt(el.qty) * parseInt(el.price)
                    }
                    ctr++;
                });
                this.selectedItems.splice(index,1)
            }
        },
        Save(){
          
            if (this.selectedItems.length > 0) {
                Swal.fire({
                    title: 'Checkout Now?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Saved!', '', 'success')
                    } else if (result.isDismissed) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }else{
                Swal.fire(
                    'Please select item/s',
                    '',
                    'error'
                    )
            }

        }
    }

}
</script>
<!-- <style scoped src="@/assets/css/users/index.css"></style> -->
<style scoped src="@/assets/css/users/cart.css"></style>