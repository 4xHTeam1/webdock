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
            this.$store.dispatch('admin/getUsers', 3)
        },
    },
    mounted: async function () {
        await this.getAllUsers()
    },
    components: {
        userElement,
    }
}
</script>

<style></style>