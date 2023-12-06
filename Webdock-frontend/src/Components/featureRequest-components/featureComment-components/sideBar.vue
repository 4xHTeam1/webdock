<template>
    <div class="sidebarContainer">
        <div class="sidebarSelection">
            <div class="sidebarCategory">
                <div class="sidebarCateHeader"><h1>Category</h1></div>
                <div class="sidebarLabel">{{ feature.category.name }}</div>
            </div>
            <div class="sidebarVoters">
                <div class="sidebarVoteHeader"><h1>Voters</h1></div>
                <div class="postUpVoters">
                    <div class="upvoterInfo" v-for="upvote in feature.featureUpvotes" :key="upvote">
                        <div class="upvoteUserAvatar">
                            <div class="noAvatar"
                                v-if="upvote.user.avatarURL === null || upvote.user.avatarURL === undefined || upvote.user.avatarURL === ''"
                                style="background-color:rgb(154, 153, 204);">{{ upvote.user.name[0] }}</div>
                            <img v-else :src="upvote.user.avatarURL" alt="avatar" class="user_img" />
                            <img src="../../../Assets/webdock-logo-farvet.png" alt="webdock admin"
                                v-if="upvote.user.role.toLowerCase() === 'admin'" class="admin_logo">
                        </div>
                        <div class="userName"
                            :style="{ color: upvote.user.role.toLowerCase() === 'admin' ? '#018647' : '' }">{{
                                upvote.user.role.toLowerCase() === 'admin' ? upvote.user.name + ' from Webdock' :
                                upvote.user.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        feature: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style>
.sidebarContainer {
    background-color: #FCFCFC;
    border-radius: 10px;
    width: 300px;
    padding: 20px;
    height: fit-content;
    border: 2px solid #d9d9d9;
}

.sidebarCategory {
    margin: 0 0 25px;
}

.sidebarCateHeader {
    margin: 0 0 5px;
}

.sidebarVoteHeader {
    margin: 0 0 10px;
}

.upvoterInfo {
    display: flex;
    flex-direction: row;
}

.postUpVoters {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.upvoteUserAvatar {
    min-width: 26px;
    width: 26px;
    height: 26px;
    border-radius: 100px;
    position: relative;
    z-index: 1;
    margin: 0 10px 0 0;
}

.noAvatar {
    font-size: 18px;
    color: white;
    width: 100%;
    height: 100%;
    background: grey;
    border-radius: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-transform: uppercase;
    position: absolute;
    margin: 0 10px 0 0;
}

.postUpVoters {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.user_img {
    width: 100%;
    height: 100%;
    border-radius: 100px;
    object-fit: cover;
}
</style>