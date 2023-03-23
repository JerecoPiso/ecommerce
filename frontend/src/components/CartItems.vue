<template>
    <tr>
        <td><input type="checkbox" @change="selectedChange()" ref="checkbox"  class="me-4 selected-item"> <img :src="'/images/'+image" class="cart-img"> <span class="p-name">{{productName}}</span></td>
        <td class="price">₱ {{price.toLocaleString("en-US")}}</td>
        <td> <div class="d-flex"><button type="button" class="minus" @click="minusQty()">-</button><input type="number" @mouseout="changeQty()" v-model="totalQty"  class="qty"><button type="button" @click="addQty()" class="plus">+</button></div> </td>
        <td class="price">₱ {{ totalPayment.toLocaleString("en-US")   }}</td>
        <td><button type="button" class="remove-btn" @click="removeItem()"><i class="fa-solid fa-trash"></i>  </button></td>
    </tr>
</template>
<script>
import Swal from 'sweetalert2';
export default{
    name: "CartItems",
    props: {    
        image: String,
        productName: String,
        price: null,
        qty: null,
        id: null,
        stocks: null
    },
    emits: ['remove', 'selectitem', 'unselectitem'],
    created(){
        this.totalPayment = this.price * this.totalQty
    },
    data(){
        return{
            totalQty: parseInt(this.qty),
            totalPayment: this.price * this.totalQty,
            products: [],
            modelQty: null
        }
    },
    methods:{
        selectedChange(){
             if(this.$refs.checkbox.checked){
                this.$emit("selectitem")
             }else{
                this.$emit("unselectitem")
             }
        },
        addQty(){

            if(this.totalQty < this.stocks){
                this.totalQty++;
                this.totalPayment = this.price * this.totalQty
   
                this.updateCart()
                // this.$emit("updateqty")
                if(this.$refs.checkbox.checked){
                    this.$emit("selectitem")
                }else{
                    this.$emit("unselectitem")
                }

            }else{
                Swal.fire('','Quantity cannot be greater than stocks!','error')
            }
        },
        changeQty(){
            if(this.totalQty <= this.stocks && this.totalQty != 0){
                this.totalPayment = this.price * this.totalQty
                this.updateCart()

            }else{
                this.totalQty = 1
                Swal.fire('','Quantity cannot be greater than stocks!','error')
            }
        },
        minusQty(){
            if(this.totalQty > 1){
                this.totalQty--;
                this.totalPayment = this.price * this.totalQty
                this.updateCart()
                if(this.$refs.checkbox.checked){
                    this.$emit("selectitem")
                }else{
                    this.$emit("unselectitem")
                }
            }else{
                Swal.fire('','Quantity cannot be empty!','error')
            }
        },
        removeItem(){
            
            this.products = []
            Swal.fire({
                title: 'Do you want to remove this item?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$emit('remove')
                    this.$cookies.get('cart').forEach(el => {
                    var orders = {};
                    if ((this.id != el.id)) {
                            orders = {
                                product_name: el.product_name,
                                image: el.image,
                                price: el.price,
                                qty: this.totalQty,
                                id: el.id,
                                stocks: el.stocks
                        }
                        this.products.push(orders)
                    }
                    this.$cookies.set('cart', JSON.stringify(this.products))
                  
                    
                    });
                    Swal.fire('Saved!', '', 'success')
                } else if (result.isDismissed) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        },
    
        updateCart(){
            this.products = []
            this.$cookies.get('cart').forEach(el => {
               var orders = {};
            //    console.log(this.id)
               if (this.id == el.id) {
                    orders = {
                        product_name: el.product_name,
                        image: el.image,
                        price: el.price,
                        qty: this.totalQty,
                        id: el.id,
                        stocks: el.stocks
                }
               }else{
                    orders = {
                        product_name: el.product_name,
                        image: el.image,
                        price: el.price,
                        qty: el.qty,
                        id: el.id,
                        stocks: el.stocks
                }
               }

               this.products.push(orders)
            });
            this.$cookies.set('cart', JSON.stringify(this.products))
        }
    }
}
</script>
<style scoped src="@/assets/css/users/cart.css"></style>