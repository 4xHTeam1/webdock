<template>
    <div class="Admin_Container" v-if="this.isLoggedIn">
        <adminMenu />
        <div class="Admin_UserElements">
            <router-view> </router-view>
        </div>
    </div>
</template>

<script>
import adminMenu from '../Components/admin/adminMenu.vue'
export default {
    data() {
        return {
            isLoggedIn: false,
        }
    },
    components: {
        adminMenu,
    },
    mounted() {
        if (this.$store.state.auth.user === null || this.$store.state.auth.user.role.toLowerCase() !== 'admin') {
            this.$router.push('/')
        } else {
            this.isLoggedIn = true
        }
    },
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