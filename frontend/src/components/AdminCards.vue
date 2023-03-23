<template>
    <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="cards" :class="bgc">
            <div class="card-logo">
                <i :class="className"></i> 
            </div>
            <div class="total">
                <p class="name">{{name}}</p>
                <p class="number">{{total}}</p>
            </div >
        </div>
    </div>

</template>
<script>
export default{
    name: "AdminCards",
    props: {
        name: String,
        total: Number,
        className: String,
        bgc: String
    },
    data(){
        return{
            defaultClass: "fa-brands"
        }
    }
}
</script>
<style scoped>
.bg-blue{
    background-color: rgb(0, 153, 230);
}
.bg-green{
    background-color: rgb(0, 204, 102);
}
.cards{
    border: 1px solid #D9D9D9;
    padding: 0.1em 1em 0.3em 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
}
.card-logo{
    font-size: 3em;
    color: rgba(255,255,255);
}
.cards .total .name{
    font-family: "Poppins";
    margin-top: 1em;
    margin-left: 1em;
    font-size: 1em;
    color: rgb(255, 255, 255);
    opacity: 0.8;
}
.number{
    font-family: "Poppins";
    margin-top: -1em;
    margin-left: 1em;
    font-size: 1.1em;
    margin-bottom: 0;
    color: rgb(255, 255, 255);
    letter-spacing: 0.5px;
}
</style>