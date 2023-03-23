<template>
    <p class="page-title">Account Settings</p>
    <div class="row">
        <div class="col-xl-4">
            <div class="dp">
                <img src="/images/john-doe.png" alt="">
                <button type="button" class="change-dp"><i class="fa-solid fa-camera"></i></button>
            </div>
        </div>
        <div class="col-xl-8">
            <p class="form-title">User Information</p>
            <form @submit.prevent="updateInfo()">
                <label for="">Username</label>
                <input type="text" v-model="name">
                <label for="" class="mt-4">Email</label>
                <input type="email" v-model="email">
                <div class="row">
                    <div class="col-xl-4">
                        <label for="" class="mt-4">Province</label>
               
                        <select @change="getMunicipality()" v-model="selectedProvince">
                            <option v-for="province in provinces" :key="province.id" :value="province.prov_code">{{province.name}}</option>
                        </select>
                    </div>
                    <div class="col-xl-4">
                        <label for="" class="mt-4">Municipality</label>
                        <select @change="getBrgy()" v-model="selectedMunicipality">
                            <option v-for="mun in municipalities" :key="mun.id" :value="mun.mun_code">{{mun.name}}</option>
                        </select>
                    </div>
                    <div class="col-xl-4">
                        <label for="" class="mt-4">Barangay</label>
                        <select v-model="selectedBrgy">
                            <option v-for="b in brgys" :key="b.id" :value="b.brgy_code">{{b.name}}</option>
                        </select>
                    </div>
                </div>

                <div class="d-flex flex-row-reverse mt-3">
                    <button type="submit" class="btn-update">Update</button>
                </div>
            </form>
   
            <!-- <p class="form-title mt-4">Security</p>
            <form action="">
                <label for="">Password</label>
                <input type="text">
                <label for="" class="mt-4">Email</label>
                <input type="email">
            </form> --> 
    
        </div>
    </div>
</template>
<script>
import phil from 'phil-reg-prov-mun-brgy'
export default{
    // name: 'AccountSettings',
    data(){
        return{
            provinces: [],
            municipalities: [],
            brgys: [],
            selectedMunicipality: '',
            selectedProvince: '',
            selectedBrgy: '',
            email: '',
            name: ''
        }
    },
    created(){
        this.provinces = phil.sort(phil.provinces, 'A')
        this.selectedProvince = '1401'
        this.getMunicipality()
        this.email = this.$store.state.user.email
        this.name = this.$store.state.user.username

    },

    methods:{
        async updateInfo(){
            alert("Updated")

       },
        getMunicipality(){
            this.municipalities = phil.getCityMunByProvince(this.selectedProvince)
            this.selectedMunicipality = ''
            this.getBrgy()
        },
        getBrgy(){
            this.brgys = phil.getBarangayByMun(this.selectedMunicipality)
         
        }
    }
}
</script>
<style scoped src="@/assets/css/users/accountsettings.css"></style>