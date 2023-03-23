<template>
    <div class="bg">
        <div class="not-found">
            <p class="oops">Oops!</p>
            <p class="pnf">404 | PAGE NOT FOUND</p>
            <p class="quote">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <button type="button">Back</button>
        </div>
    </div>
</template>
<script>
export default{
    name: "PagenotFound",
    data(){
        return{

        }
    }
}
</script>
<style scoped>

.bg{
    min-height: 100vh;
    max-height: auto;
    background-image:linear-gradient(102.2deg,#fba63c 1.2%,#d5392c 107.5%);
    position: absolute;
    width: 100%;
}
button{
    width: 10em;
    padding: 0.5em 1em 0.5em 1em;
    border-radius: 2em;
    margin: 1em auto auto auto;
    display: block;
    border: none;
    font-size: 1.5em;
    font-family: "Poppins";
    
}
button:hover{
    color: rgba(255,255,255);
    background-image:linear-gradient(102.2deg,#fba63c 1.2%,#d5392c 107.5%);
    border: 2px solid rgb(255,255,255);
}
.oops{
    font-family: "Poppins";
    font-size: 5em;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;
    color: rgb(255,255,255);
}
.pnf{
    text-align: center;
    font-family: "Poppins";
    font-size: 3em;
    color: rgb(255,255,255);
}
.quote{
    text-align: center;
    color: rgb(255,255,255);
    display: block;
    margin: auto;
    font-family: "Poppins";
    font-size: 1em;
}
.not-found{
    margin: 3em auto 3em auto;
    width: 50%;
    display: block;
}
</style>