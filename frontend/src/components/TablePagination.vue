<template>
    
    <div>  
        <span>Show&ThinSpace; 
          <select class="filter-to-show">
            <option>10 </option>
            <option>25</option>
            <option>50 </option>
          </select>&ThinSpace; Entries
        </span>
        <div class="paginate right">
            <button type="button" @click="prevPage" class="btn-prev"><i class="fa-solid fa-backward"></i></button>
            <button type="button" class="btn-page"> <span>{{ currentPage }} of {{ totalPage }}</span>  </button>
            <button type="button" @click="nextPage" class="btn-next"><i class="fa-solid fa-forward"></i></button>
        </div>
    </div>
</template>
<script>
export default{
    name: 'TablePagination',
    props: {    
        currentPage: Number,
        totalPage: Number
    },
    emits: ['prev', 'next'],
    methods:{
        prevPage(){
            this.$emit('prev', { currentPage: this.currentPage, totalPage: this.totalPage });
        },
        nextPage(){
            this.$emit('next');
        }
    }
}
</script>
<style scoped src="@/assets/css/admin/index.css"></style>