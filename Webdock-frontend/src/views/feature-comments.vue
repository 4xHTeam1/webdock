<template>
    <div class="container">dfsghjfdghds</div>
    <div class="container d-flex justify-content-center Comments_Container">
        <sideBar />
        <div class="Comments_OverviewContainer">
            <div class="overview-comments">
                <postOverview />
                <div class="postActivity">
                    <div class="publicHeader">
                        <div class="headerLeft">Activity Feed</div>
                        <div class="headerRight">
                            <span class="sortBy">Sort by</span>
                            <div class="sortByDropdown">
                                <select class="sortSelect">
                                    <option value="Newest first">Newest first</option>
                                    <option value="Oldest first">Oldest first</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="ActivityList_Container">
                        <div class="activityList">
                            <div class="postStatusChange">
                                <postStatusChange status="planned" color="#1FA0FF" />
                            </div>
                            <div class="postComments">
                                <postComment />
                                <div class="replyComment">
                                    <postComment />
                                    <postComment />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sideBar from '../Components/featureRequest-components/featureComment-components/sideBar.vue'
import postComment from '../Components/featureRequest-components/featureComment-components/postComment.vue'
import postStatusChange from '../Components/featureRequest-components/featureComment-components/postStatusChange.vue'
import postOverview from '../Components/featureRequest-components/featureComment-components/postOverview.vue'
export default {
    components: {
        postOverview,
        postStatusChange,
        postComment,
        sideBar,
    }
}
</script>

<style>
.Comments_Container {
    flex: 1 1 0;
    gap: 18px;
    padding: 24px 0;
}

.activityList {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    flex: 1 1 0;
    overflow-y: auto;
    overflow-x: hidden;
}

.ActivityList_Container{
    display: flex;
    flex-direction: column;
    flex: 1;
}

.Comments_OverviewContainer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
}

.overview-comments {
    flex: 1 1 0;
    flex-wrap: nowrap;
    background: #FCFCFC;
    border-radius: 10px;
    max-width: 600px;
    padding: 24px;
    display: flex;
    flex-direction: column;
}

.postActivity {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    flex: 1;
}

.publicHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;
}

.headerRight {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.postStatusChange {
    padding: 12px 10px 12px 0;
    border: 2px solid #ebebeb;
    border-radius: 6px;
    margin-bottom: 12px;
}

.sortSelect {
    min-width: 80px;
    width: auto;
    border-radius: 4px;
    padding: 6px;
    border: 2px solid #ebebeb;
}

.sortBy {
    display: flex;
    align-items: center;
}

.sortSelect:focus {
    outline: none;
}

.commentContainer {
    border-radius: 6px;
    display: flex;
    flex-direction: column;
}

.inputArea {
    height: 45px;
    width: 100%;
    border: none;
    outline: none;
    overflow-y: hidden;
    resize: none;
    padding: 8px 12px;
    border: 2px solid #EBEBEB;
    font-size: 14px;
    background-color: #f7f7f7;
    color: black;
}

.inputArea:focus {
    outline: none;
}

.submitContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px;
}

.showBorder {
    border: 2px solid #EBEBEB;
    border-top: none;
}

.imageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 39px;
    height: 39px;
    background-color: #e8e8e8;
    border-radius: 6px;
}

.submitBtn {
    width: 80px;
    height: auto;
    text-align: center;
    font-size: 16px;
    background-color: #018647;
    color: white;
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
}

.replyComment {
    padding: 12px 0 12px 43px;
}
</style>