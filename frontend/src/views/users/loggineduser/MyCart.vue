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
                <CartItems v-for="p, index in products" :key="p.id" :id="p.id" :price="p.price" :qty="p.quantity"
                    :productName="p.product_name" :image="p.img_name" :stocks="p.stocks" @unselectitem="unselectitem(p.orderid)"
                    @selectitem="select(index);" @remove="products.splice(index, 1); unselectitem(p.id);"></CartItems>
            </tbody>
        </table>
    </div>
    <p v-if="products.length < 1" class="text-center no-item">No Item On Cart</p>
    <RouterLink v-if="products.length < 1" :to="{ name: 'AllProducts' }" class="show-now">Shop Now </RouterLink>
    <div class="order-summary ">
        <p class="p-labels mt-2 mb-2">Order Summary</p>
        <p class="total">Total Items <span>{{ totalItem }}</span> </p>
        <p class="total">Total Amount <span> ₱ {{ totalAmount.toLocaleString('en-us') }}</span></p>
        <button type="button" class="btn-checkout" @click="Save()">Checkout </button>
    </div>
</template>
<script>
import { getMyCart } from "@/apis/api.js";
import Swal from 'sweetalert2';
import CartItems from '@/components/CartItems.vue';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    name: "MyCart",
    components: {
        CartItems,
    },
    data() {
        return {
            quantity: 0,
            products: [],
            selectedItems: [],
            totalItem: 0,
            totalAmount: 0,
            url: '',
        }
    },
    computed: {
        ...mapGetters(["userId"])
    },
    created() {
        document.title = "Techworld | Cart";
        this.url = axios.defaults.baseURL;
    },
    mounted(){
        (async () => {
            this.products = await getMyCart(this.userId.id);
        })()
    },
    methods: {
        select(index) {
            this.totalItem = 0
            this.totalAmount = 0
            var product = this.products
            this.selectedItems.push(product[index])
            this.selectedItems.forEach(el => {
                this.totalItem += el.quantity
                this.totalAmount += parseInt(el.quantity) * parseInt(el.price)
            });
        },
        unselectitem(orderid) {
            var ctr = 0;
            var index = 0;
            this.selectedItems.forEach(el => {
                if (el.orderid == orderid) {
                    index = ctr;
                    this.totalItem -= el.quantity
                    this.totalAmount -= parseInt(el.quantity) * parseInt(el.price)
                }
                ctr++;
            });
            this.selectedItems.splice(index, 1)
        },
        Save() {

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
            } else {
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