<template>
    <AdminHeader></AdminHeader>
    <div class="box">
        <AdminSidenav></AdminSidenav>
        <div class="dashboard-body">
            <router-view/>

        </div>
    </div>
</template>
<script>
import AdminHeader from '@/components/templates/AdminHeader.vue';
import AdminSidenav from '@/components/templates/AdminSidenav.vue';
export default{
    name: 'DashBoard',
    components:{
        AdminHeader,
        AdminSidenav,
    },

}
</script>
<style scoped src="@/assets/css/admin/index.css"></style>
