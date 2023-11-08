<template>
  
        <div class="icon-dot">
            <img class="icon-color icon-size" :src="iconSrc" >
        </div>
        <div class="icon-dot icon-p">
            <p class="icon-p">{{ letterSrc }}</p>
        </div>    
</template>

<script lang="ts">
export default {
    props: {
        iconSrc: String,
        letterSrc: String
    }

}


</script>

<style>

.icon-dot{
    max-width: fit-content;
    display: flex;
    flex-direction: row;

    border-radius: 50%;
    border: 4px solid #fff ;

    min-height: 36px;
    min-width:  36px;
    max-height: 36px;
    max-width:  36px;
    
    margin-left: 10px;
}
.icon-p{
    color:#ffffff;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: space-around;
    justify-content: space-around;
}

.icon-color {
    filter: invert(93%) sepia(0%) saturate(7500%) hue-rotate(103deg) brightness(108%) contrast(109%);
}
.icon-size{
    height: 20px;
    width:  20px;
    margin: auto;
}

</style>

