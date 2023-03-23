<template>
            <p class="page-title">Dashboard | Customers</p>
            <div class="row">
                <div class="col-xl-12">
                    <div class="tables mt-1">
                        <p class="table-title mt-3 mb-1"><span>Verified Customers</span>                  
                            <select class="filter">
                                <option selected disabled>Filter by</option>
                                <option>Online </option>
                                <option>Offline </option>
                            </select>
                        </p>
                        <div class="table-responsive mt-1">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="v in verifiedUsers" :key="v.id">
                                      <td><img :src="'/images/49f05c5d08bfaa7bd12415cf1dda90e3.ico'" alt="" class="user-dp"> &ThinSpace; <span>{{v.username}}</span> </td>
                                      <td>{{v.email}}</td>
                                      <td ><span :class="setClass(v.status)">{{setStatus(v.status)}}</span></td>
                                    </tr>
                                  </tbody>
                            </table>
                          </div>
                          <TablePagination :current-page="currentPageV" :total-page="totalPageV" @next="nextPageV()" @prev="prevPageV()"></TablePagination>
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="tables mt-4">
                        <p class="table-title mt-3 mb-1"> <span>Unverified Customers</span>
                            <select class="filter">
                                <option selected disabled>Filter by</option>
                                <option>Online </option>
                                <option>Offline </option>
                            </select>
                        </p>
                        <div class="table-responsive mt-1">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Status</th>
                                      <th>Verify</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="v in unverifiedUsers" :key="v.id">
                                      <td><img src="/images/49f05c5d08bfaa7bd12415cf1dda90e3.ico" alt="" class="user-dp"> &ThinSpace; <span>{{v.username}}</span></td>
                                      <td>{{v.email}}</td>
                                      <td ><span :class="setClass(v.status)">{{setStatus(v.status)}}</span></td>
                                      <td class="action-max-width"><button type="button" class="btn-verify">Verify</button><button type="button" class="btn-decline">Decline</button></td>
                                      
                                    </tr>
                                  </tbody>
                            </table>
                          </div>
                          <TablePagination :current-page="currentPageUV" :total-page="totalPageUV" @next="nextPageUV()" @prev="prevPageUV()"></TablePagination>
                    </div>
                </div>
            </div>

</template>
<script>
import TablePagination from '@/components/TablePagination.vue';
import axios from 'axios';
export default{
    name: 'OurCustomers',
    components:{
        TablePagination
    },
    data(){
        return{
            verifiedUsers: [],
            unverifiedUsers: [],
            url: '',
            currentPageV: 1,
            totalPageV: 8,
            currentPageUV: 1,
            totalPageUV: 8,
        }
    },
    created(){
        this.getVerifiedUsers()
        this.getUnVerifiedUsers()
        this.url = axios.defaults.baseURL
    },

    methods:{
        async getVerifiedUsers(){
            try{
                const response = await axios.get(this.url+"admin/getverifiedusers")
                // console.log(response.data)
                this.verifiedUsers = []
                this.verifiedUsers = response.data
            }catch(err){
                console.log(err)
            }
        },
        async getUnVerifiedUsers(){
            try{
                const response = await axios.get(this.url+"admin/getunverifiedusers")
                // console.log(response.data)
                this.unverifiedUsers = []
                this.unverifiedUsers = response.data
            }catch(err){
                console.log(err)
            }
        },
        setClass(status){
            if(status == 1){
                return 'online'
            }else{
                return 'offline'
            }
        },
        setStatus(status){
            if(status == 1){
                return 'Online'
            }else{
                return 'Offline'
            }
        },
        nextPageV(){
            if(this.currentPageV < this.totalPageV){
                this.currentPageV++;
            }
        },
        prevPageV(){
            if(this.currentPageV > 0){
                this.currentPageV--;
            }
        },
        nextPageUV(){
            if(this.currentPageUV < this.totalPageUV){
                this.currentPageUV++;
            }
        },
        prevPageUV(){
            if(this.currentPageUV > 0){
                this.currentPageUV--;
            }
        }

    }
}
</script>
<style scoped src="@/assets/css/admin/index.css"></style>
<style scoped src="@/assets/css/admin/customers.css"></style>