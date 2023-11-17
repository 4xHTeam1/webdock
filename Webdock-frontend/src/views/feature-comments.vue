<template>
    <div class="container d-flex justify-content-center">
        <div class="overview-comments">
            <postOverview/>
            <div class="postActivity">
                <div class="publicHeader">
                    <div class="headerLeft">Activity Feed</div>
                    <div class="headerRight">
                        <span class="sortBy">Sort by</span>
                        <div class="sortByDropdown">
                            <button class="SortButton">
                                <div class="left">Newest first</div>
                                <div class="sortByIcon"></div>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="activityList">
                    <div class="postStatusChange">
                        <postStatusChange status="planned" color="#1FA0FF"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import postStatusChange from '../Components/postStatusChange.vue'
import postOverview from '../Components/postOverview.vue'
export default {
    components: {
    postOverview,
    postStatusChange
  }
}
</script>

<style>
body{
    width: 100%;
    height: auto;
    background-image: url("../Assets/webdock-baggrund.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.overview-comments{
    background-color: #FCFCFC;
    border-radius: 10px;
    width: 600px;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 18px;
}

.postActivity{
    margin-top: 32px;
}

.publicHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
}

.headerRight{
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.postStatusChange{
    padding: 12px 0;
}

</style>