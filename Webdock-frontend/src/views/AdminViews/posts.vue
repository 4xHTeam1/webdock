<template>
    <postElement v-for="feature in this.admin.features" :key="feature.id" :post="feature"/>
</template>
<script>
import { mapState } from 'vuex'
import postElement from '../../Components/admin/postElement.vue'

export default {
    computed: {
        //importere alle states fra admin modulet som er under stores/modules
        ...mapState(['admin', 'auth'])
    },
    methods: {
        async getAllFeatures() {
            this.$store.dispatch('admin/getFeatures');
        },
    },
    created: async function(){
        //if statement kigger om du er admin eller ej hvis du ikke har admin adgang bliver du redirected tilbage
        //ellers henter den alle features.
        if (this.auth.user === null || this.auth.user.role.toLowerCase() !== 'admin') {
            this.$router.push('/')
        } else {
            await this.getAllFeatures()
            
        }
    },
    components: {
        postElement,
    }
}
</script>
<style></style>
