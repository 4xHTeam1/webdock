<template>
    <div class="Admin_Container">
        <adminMenu />
        <div class="Admin_UserElements">
            <router-view> </router-view>
        </div>
    </div>
</template>

<script>
import adminMenu from '../Components/admin/adminMenu.vue'
export default {
    components: {
        adminMenu,
    }
}
</script>


<style>
.Admin_Container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.Admin_UserElements {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    overflow-y: scroll;
    background: #fff;
}
</style>