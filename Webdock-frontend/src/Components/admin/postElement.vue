<template>
    <div class="postContainer">
        <div>{{ post.id }}</div>
        <div class="postTitle"><h1>{{ post.title }}</h1></div>
        <!--Status div, fortæller inline styling til at være den udvalgte farve fra vores status-->
        <!--denne farve kommer fra databasen som kan ses i postman webdock-feature/features/getallfeatures-->
        <div class="postStatus" :style="`color: ${post.status.color};`">{{ post.status.name }}</div>
        <div class="deleteButton" @click="showModal = true">
            <p>Delete post</p>
        </div>
        <div class="modal" v-if="showModal">
            <div class="optionContainer">
                <h2>Confirm Delete</h2>
                <div class="optionBtns">
                    <button class="btnConfirm" @click="deletePost()">Confirm</button>
                    <button class="btnCancel" @click="showModal = false">Cancel</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: 'postElement',
    data() {
        return {
            showModal: false,
        };
    },
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    methods: {
        async deletePost() {
            await this.$store.dispatch('admin/deleteFeature', this.post.id)
        }
    },
    created: async function() {
        console.log("postelement", this.post)
    }
}

</script>
<style>
.postContainer{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 40px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 6px;
}

.postTitle h1{
    width: 400px;
    margin: 0;
}

.deleteButton{
    background: #fc5454;
    color: #fff;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.modal{
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    z-index: 100;
}

.optionContainer{
    background: #fff;
    padding: 20px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.optionBtns{
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.btnConfirm{
    background: #fc5454;
    color: #fff;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.btnCancel{
    background: #fff;
    color: #fc5454;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
</style>
