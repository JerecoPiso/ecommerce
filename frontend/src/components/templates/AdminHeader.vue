<template>
    <div class="header">
        <p class="logo">techworld.</p>
        <div class="user-settings">
             <img src="/images/rode.png" alt="">
             <p>Jereco James Piso <span>General Manager</span>   </p>
             <!-- <i style="float: right;margin-top: -1.5em;font-size: 2em;margin-lef: 3em" class="fa-solid fa-circle-chevron-down"></i> -->
        </div>
     </div>
</template>
<script>
export default{
    name: "AdminHeader",
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.header{
    height: 5em;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-color: rgba(251,166,60,1);
}
.logo{
    font-family: poppins;
    font-size: 36px;
    padding-top: 0.3em;
    color: white;
    padding-left: 1em;
    font-weight: bold;
    display:inline-block;
}
.user-settings{
    margin-right: 1em;
    float: right;
    margin-top: 1em;
    color: rgb(255,255,255);
    cursor: pointer;
    width: 15em;
}
.user-settings img{
    height: 3em;
    width: 3em;
    border-radius: 50%;
    float: left;
    margin-right: 0.6em;
}
.user-settings p{
    color: rgb(255,255,255);
    font-family: "Poppins";
    letter-spacing: 0.3px;
    line-height: 18px;
    margin-top: 0.2em;

}
.user-settings p span{
    color: rgb(255,255,255);
    font-family: "Poppins";
    letter-spacing: 0.3px;
    font-size: 0.8em;
    opacity: 0.8;
}
</style>