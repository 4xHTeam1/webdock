<template>
    <div class="mergeComment_Container">
        <div class="mergeComment_Info">
            <p class="mergeComment_Title">Merged In A Post:</p>
        </div>
        <div class="mergeComment_DataWrapper">
            <h1 class="mergeComment_DataTitle">
                {{ mergedPost.title }}
            </h1>
            <div class="postUserInfo">
                <div class="usersAvatar">
                    <div class="noneAvatar" v-if="mergedPost.user.avatarURL === null ||
                        mergedPost.user.avatarURL === '' ||
                        mergedPost.user.avatarURL === undefined
                        " style="background-color: #9cb">
                        {{ mergedPost.user.name[0] }}
                    </div>
                    <img v-else :src="mergedPost.user.avatarURL" alt="avatar" class="user_img" />
                    <img src="../../Assets/webdock-logo-farvet.png" alt="webdock admin"
                        v-if="mergedPost.user.role.toLowerCase() === 'admin'" class="admin_logo" />
                </div>
                <div class="userName" :style="{
                    color: mergedPost.user.role.toLowerCase() === 'admin' ? '#018647' : '',
                }">
                    {{
                        mergedPost.user.role.toLowerCase() === "admin"
                        ? mergedPost.user.name + " from Webdock"
                        : mergedPost.user.name
                    }}
                </div>
            </div>
            <p class="mergeComment_DataDescription">
                {{ mergedPost.description }}
            </p>
            <p class="mergeComment_DataDate">
                {{ new Date(mergedPost.dateSubmitted).toLocaleDateString() }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mergedPost: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.mergeComment_Container {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.mergeComment_Info {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.mergeComment_Title {
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
    color: #000;
}

.mergeComment_DataWrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;

}

.mergeComment_DataTitle {
    margin: 0;
}

.mergeComment_DataDescription {
    margin: 0 0 0 45px;
    padding: 0;
    color: #000;
}

.mergeComment_DataDate {
    text-align: end;
}
</style>