<template>
    <p class="page-title">Dashboard | Home</p>
    <div class="row">
        <AdminCards name="Total Products" :total="totalProducts" class-name="fa-brands fa-product-hunt" bgc="bg-green">
        </AdminCards>
        <AdminCards name="Total Orders" :total="parseInt(1236)" class-name="fa-solid fa-bag-shopping" bgc="bg-blue">
        </AdminCards>
        <AdminCards name="To Received" class-name="fa-solid fa-truck" bgc="bg-green" :total="parseInt(1236)"></AdminCards>
        <AdminCards name="Total Customers" :total="totalCustomers" class-name="fa-solid fa-gear" bgc="bg-blue"></AdminCards>
    </div>
    <div class="row mt-4">
        <div class="col-lg-8">
            <canvas id="sales"></canvas>
        </div>
        <div class="col-lg-4">
            <div class="top-selling-products">
                <p class="title">Top Selling Products</p>
                <TopSelling v-for="p in popularProducts" :key="p.id" :pname="p.product_name"
                    :img-src="'/images/' + p.img_name" :sold="p.sold"></TopSelling>

            </div>
        </div>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
import axios from 'axios'
import AdminCards from '@/components/AdminCards.vue';
import TopSelling from '@/components/TopSelling.vue';
export default {
    name: 'MainPage',
    components: {
        AdminCards,
        TopSelling,

    },
    mounted() {
        (async function () {
            const data = [
                { year: 2015, count: 10 },
                { year: 2016, count: 2 },
                { year: 2017, count: 15 },
                { year: 2018, count: 10 },
                { year: 2019, count: 3 },
                { year: 2020, count: 15 },
                { year: 2021, count: 10 },
                { year: 2022, count: 25 },
            ];

            new Chart(
                document.getElementById('sales'),
                {
                    type: 'line',
                    data: {
                        labels: data.map(row => row.year),
                        datasets: [
                            {
                                label: 'Sales by Year',
                                data: data.map(row => row.count),
                                backgroundColor: [
                                    'rgba(255, 99, 132)',
                                    'rgba(255, 159, 64)',
                                    'rgba(255, 205, 86)',
                                    'rgba(75, 192, 192)',
                                    'rgba(54, 162, 235)',
                                    'rgba(153, 102, 255)'
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)'
                                ],
                                borderWidth: 1
                            }
                        ]
                    },
                }
            );
        })();
    },
    data() {
        return {
            popularProducts: [],
            url: '',
            totalProducts: null,
            totalCustomers: null
        }
    },
    created() {
        this.url = axios.defaults.baseURL
        this.getPopularProducts()
        this.getCountsForCard()
    },
    methods: {
        async getPopularProducts() {
            try {
                const response = await axios.get(this.url + "getPopularProduct");
                this.popularProducts = []
                this.totalProducts = response.data.length
                this.popularProducts = response.data
            } catch (err) {
                console.log(err)
            }
        },
        async getCountsForCard() {
            try {
                const prod = await axios.get(this.url + "admin/showProducts");
                const outofstockprod = await axios.get(this.url + "admin/getoutofstock");
                const verifiedCount = await axios.get(this.url + "admin/getverifiedusers")
                const unverifiedCount = await axios.get(this.url + "admin/getunverifiedusers")
                this.totalProducts = prod.data.length + outofstockprod.data.length;
                this.totalCustomers = verifiedCount.data.length + unverifiedCount.data.length;
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>
<style scoped src="@/assets/css/admin/index.css"></style>