<template>
    <userElement v-for="user in this.admin.users" :key="user.id" :user="user" />
</template>

<script>
import userElement from '../../Components/admin/userElement.vue'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['admin', 'auth'])
    },
    methods: {
        async getAllUsers() {
            this.$store.dispatch('admin/getUsers', this.auth.user.id)
        },
    },
    mounted: async function () {
        if (this.auth.user === null || this.auth.user.role.toLowerCase() !== 'admin') {
            this.$router.push('/')
        } else {
            await this.getAllUsers()
        }
    },
    components: {
        userElement,
    }
}
</script>

<style></style>