<template>
    <br>
    <div class="row">
        <div class="col-lg-5">
            <img class="product-img" :src="'/images/' + image">
        </div>
        <div class="col-lg-7">
            <div>
                <p class="p-name">{{ product_name }}</p>
                <p class="p-info p-price">₱ {{ price.toLocaleString('en-US') }}</p>
                <p class="p-info p-stocks">Stocks: {{ stocks }}</p>
                <p class="p-info p-brand">Brand: {{ brand }}</p>
                <p class="p-info p-category">Category: {{ category }}</p>
                <p class="p-info p-qty">Quantity </p>
                <button type="button" class="minus" @click="MinusQty">-</button><input type="number" v-model="quantity"
                    class="qty"><button type="button" @click="AddQty" class="plus">+</button>
                <button type="button" class="add-to-cart" @click="AddToCart()">Add to Cart</button>
            </div>
        </div>
    </div>
    <p class="p-labels mb-2" style="-0.5em">Description</p>
    <p>{{ description }}</p>
    <p class="p-labels line">Related Products</p>
    <div class="row">
        <ProductCard v-for="product in products" :product-id="product.id" :source="'/images/' + product.img_name"
            :key="product.id" :product-name="product.product_name" :price="product.price.toLocaleString('en-US')"
            :sold="product.sold.toString()"></ProductCard>
    </div>
    <p class="p-labels line mb-2">Feedbacks</p>
    <div class="user-feedback">
        <div>
            <img src="/images/rode.png" class="user-dp">
        </div>
        <div class="comment-box">
            <p class="uname">Jereco James Piso</p>
            <p class="comment">“Thank you Apple and techworld. Good quality and bought it at a discounted price. Had a delay
                with the delivery but understandable bc high volume of orders. Thank you.” <br> <span>2022-08-27
                    23:27</span> </p>
        </div>
    </div>
    <div class="user-feedback">
        <div>
            <img src="/images/rode.png" class="user-dp">
        </div>
        <div class="comment-box">
            <p class="uname">Jereco James Piso</p>
            <p class="comment">“Thank you Apple and techworld. Good quality and bought it at a discounted price. Had a delay
                with the delivery but understandable bc high volume of orders. Thank you.” <br> <span>2022-08-27
                    23:27</span> </p>
        </div>
    </div>
    <form @submit.prevent="" class="mt-4">
        <div class="mb-3 mt-3">
            <label for="comment" class="ff">Your Feedback</label>
            <textarea class="form-control" rows="4" id="comment" name="text"></textarea>
        </div>
        <button type="submit" class="btn-comment">Comment</button>
    </form>
    <button type="button" class="view-more">View More</button>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: "ViewProduct",
    components: {
        ProductCard
    },
    created() {

        this.getRecentProducts()
        this.getProductById()

        this.$watch(
            () => this.$route.params,
            () => {
                this.getProductById()
            }
        )
        this.url = axios.defaults.baseURL
    },
    computed: {
        ...mapGetters(["isLoggedIn"])
    },
    data() {
        return {
            quantity: 0,
            products: [],
            image: '',
            product_name: '',
            price: '',
            stocks: '',
            sold: '',
            description: '',
            category: '',
            brand: '',
            url: ""
        }
    },
    methods: {
        ...mapMutations(["setCartitem"]),
        AddToCart() {
            // var orderInfo = {
            //             product_name: this.product_name,
            //             image: this.image,
            //             price: this.price,
            //             qty: this.quantity,
            //             id: this.$route.params.id,
            //             stocks: this.stocks
            //         }
            //         this.setCartitem(orderInfo);
            if (this.isLoggedIn) {
                // alert(this.$route.params.id)
                if (this.quantity == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: '',
                        text: 'Quantity cannot be zero'
                    })
                }
                else {

                    var orderInfo = [{
                        product_name: this.product_name,
                        image: this.image,
                        price: this.price,
                        qty: this.quantity,
                        id: this.$route.params.id,
                        stocks: this.stocks
                    }]
                    this.setCartitem(orderInfo);
                    if (this.$cookies.get('cart') != null) {
                        orderInfo = orderInfo.concat(this.$cookies.get('cart'))
                    }
                    this.$cookies.set('cart', JSON.stringify(orderInfo))
                    Swal.fire({
                        icon: 'success',
                        title: '',
                        text: 'Item added to cart'
                    })
                }
            }else{
                this.$router.push("/login/cart")
            }

        },
        async getProductById() {
            const response = await axios.get(`${this.url}product/${this.$route.params.id}`);
            if (response.statusText == "OK") {
                this.image = response.data.img_name
                this.product_name = response.data.product_name
                this.price = response.data.price
                this.stocks = response.data.stocks
                this.category = response.data.category
                this.brand = response.data.brand
                this.description = response.data.description
            }
            document.title = "Product | " + this.product_name
        },
        async getRecentProducts() {
            try {
                const response = await axios.get(this.url + "getRecentProducts");
                this.products = []
                this.products = response.data
            } catch (err) {
                console.log(err)
            }
        },
        AddQty() {
            if (this.quantity < this.stocks) {
                this.quantity++;
            }
        },
        MinusQty() {
            if (this.quantity != 0) {
                this.quantity--;
            }
        }
    }
}
</script>
<style scoped src="@/assets/css/users/index.css"></style>
<style scoped src="@/assets/css/users/viewproduct.css"></style>