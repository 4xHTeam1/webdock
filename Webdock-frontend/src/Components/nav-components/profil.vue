<template>
    <div class="profil-container">
        <div class="icon-dot icon-profile" :class={toggle:OpenMenu} @click="toggleMenu">
            <p class="icon-p">{{ letterSrc }}</p>
        </div>    
        <div class="profil-dropdown" v-if="OpenMenu">
            <ul class="content-list">
                <li class="content-li">Logout</li>
                <li class="content-li">Dashboard</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return{
            OpenMenu: false,
        }
    },
    methods: {
        toggleMenu() {
            this.OpenMenu = !this.OpenMenu;
        }
    },
    props: {
        letterSrc: String
    }
}


</script>

<style>
.content-li{
    position: relative;
}
.content-list{
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
    margin-bottom: 0;
}
.profil-container{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
    user-select: none;

}
.profil-dropdown{
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    min-width: fit-content;
    width: 100%;
    background-color: #F2F2F2;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 2px solid #e0e0e0;
    z-index: 100;
    user-select: none;
    
}


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
.icon-profile{
    color:#ffffff;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: space-around;
    justify-content: space-around;
}


.icon-size{
    height: 20px;
    width:  20px;
    margin: auto;
}

</style>

