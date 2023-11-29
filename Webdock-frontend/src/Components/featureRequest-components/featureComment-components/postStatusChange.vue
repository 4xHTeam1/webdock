<template>
    <div class="statusTopContainer">
        <div class="topLeft">
            <div class="update">
                <div class="userLockupContainer">
                    <div class="userLockup">
                        <div class="userAvatarContainer">
                            <div class="userAvatar">
                                <div class="missingAvatar" style="background-color:#9cb;">A</div>
                                <div class="webdockBadge">
                                    <img src="../../../Assets/webdock-logo-farvet.png" alt="WebdockBadge">
                                </div>
                            </div>
                        </div>
                        <div class="userInfo">
                                <span class="Username" style="color:#018647">Arni from Webdock</span>
                        </div>
                    </div>
                </div>
                <span class="updateText">
                    <span>Marked this post as </span>
                    <div class="updateStatus" :style="{ '--color': color}">{{status}}</div>
                </span>
            </div>
        </div>
    </div>
    <div class="statusBottomContainer">
        <div class="commentBody">
            <div class="commentValue">
                <div class="commentText">
                    We will implement this for all core statistics (Bandwidth, CPU, RAM and Disk), hopefully with a CO2 impact indication/calculation attached to the utilization
                </div>
            </div>
        </div>
        <div class="commentMenu">
            <div class="menu">
                <div class="likeReaction">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                </div>
                <div class="menuTimestamp">August 8, 2023 </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    status: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
  },
};

</script>

<style>

.update{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.userLockup{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
}

.userAvatar{
    min-width: 26px;
    width: 26px;
    height: 26px;
    border-radius: 100px;
    position: relative;
    z-index: 1;
    margin: 0 10px 0 10px;
}

.missingAvatar{
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
}

.webdockBadge img{
    left: 16px;
    top: 15px;
    border-radius: 100%;
    position: absolute;
    width: 15px;
    height: 15px;
    padding: px;
    background-color: white;
    
}

.updateText{
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.updateStatus{
    font-size: 1rem;
    color: var(--color);
    text-transform: uppercase;
}


.statusBottomContainer{
    display: flex;
    flex-direction: column;
    padding: 5px 32px 0 46px;
}

.menu{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
}

</style>
