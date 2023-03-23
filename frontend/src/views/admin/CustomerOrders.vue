<template>
            <p class="page-title">Dashboard | Orders</p>
            <div class="row">
                <div class="col-xl-12">
                    <div class="tables mt-1">
                        <p class="table-title mt-3 mb-1"><span>Orders</span> 
                            <select class="filter">
                                <option selected disabled>Filter by</option>
                                <option>Pending </option>
                                <option>Delivered </option>
                                <option>Received </option>
                            </select>
                        </p>
                        <div class="table-responsive mt-1">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                      <th>Order #</th>
                                      <th>Customer</th>
                                      <th>Items</th>
                                      <th>Date Ordered</th>
                                      <th>View</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                        <tr>
                                            <td>05445696685</td>
                                            <td>35</td>
                                            <td>35</td>
                                            <td>Date Ordered</td>
                                            <td> <button type="button" class="btn-view" @click="view = true"> <i class="fa-solid fa-eye"></i></button></td>
                                            <td>
                                            <button type="button" :class="'status' + ' ' + statusClass('Delivered')">{{statusClass('Delivered')}}</button>
                                            </td>
                                        </tr>
                                  </tbody>
                            </table>
                           
                          </div>
                          <TablePagination :current-page="currentPage" :total-page="totalPage" @next="nextPage()" @prev="prevPage()"></TablePagination>
                    </div>
                </div>
            </div>
            <Transition name="bounce">
                <div class="cust-orders" v-if="view">
                        <div class="order-list">
                            <div class="head">
                                <span>Order Info</span>
                                <i class="fa-sharp fa-solid fa-xmark right" @click="view = false;"></i>
                            </div>
                            <div class="body mt-2">
                                <p>Buyer : &ThinSpace; Jereco James Piso</p>
                                <div>
                                    <img :src="'/images/Lenovo_Legion_Event_2.jpg'" class="tbl-product-img br"> 
                                    <p class="ms-3">iPhone 14 Pro Max 
                                        <br><span>14 Pcs</span>
                                        <span class="amount">₱ 600.00</span>
                                    </p>
                                </div>
                                <div>
                                    <img :src="'/images/Lenovo_Legion_Event_2.jpg'" class="tbl-product-img br"> 
                                    <p class="ms-3">iPhone 14 Pro Max 
                                        <br><span>14 Pcs</span>
                                        <span class="amount">₱ 600.00</span>
                                    </p>
                                </div>
                                <div>
                                    <img :src="'/images/Lenovo_Legion_Event_2.jpg'" class="tbl-product-img br"> 
                                    <p class="ms-3">iPhone 14 Pro Max 
                                        <br><span>14 Pcs</span>
                                        <span class="amount">₱ 600.00</span>
                                    </p>
                                </div>
                                
                            </div>
                            <div class="total"><p>Total Amount : ₱ 600.00</p></div>
                        </div>
                </div>
            </Transition>
</template>
<script>
import TablePagination from '@/components/TablePagination.vue';
export default{
    name: 'CustomerOrder',
    components:{
        TablePagination
    },
    data(){
        return{
            products: null,
            classes: ['Pending','Approved','Delivered','Received'],
            currentPage: 0,
            totalPage: 10,
            view: false
        }
    },
    methods:{
        statusClass(statClass){
            return statClass
        },
        nextPage(){
            if(this.currentPage < this.totalPage){
                this.currentPage++;
            }
        },
        prevPage(){
            if(this.currentPage > 0){
                this.currentPage--;
            }
        }
    }
}
</script>
<style scoped src="@/assets/css/admin/index.css"></style>
<style scoped src="@/assets/css/admin/orders.css"></style>