<template>
    <userElement v-for="user in this.$store.state.admin.users" :key="user.id" :user="user" />
</template>

<script>
import userElement from '../../Components/admin/userElement.vue'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['admin'])
    },
    methods: {
        async getAllUsers() {
            this.$store.dispatch('admin/getUsers', this.$store.state.auth.user.id)
        },
    },
    mounted: async function () {
        if (this.$store.state.auth.user === null || this.$store.state.auth.user.role.toLowerCase() !== 'admin') {
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