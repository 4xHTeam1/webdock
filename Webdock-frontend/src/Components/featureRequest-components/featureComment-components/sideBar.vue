<template>
<div class="sidebarContainer">
    <div class="sidebarSelection">
        <div class="sidebarCatagory">
            <div class="sidebarCataHeader">Catagory</div>
            <div class="sidebarLabel">Dashboard features</div>
        </div>
        <div class="sidebarVoters">
            <div class="sidebarVoteHeader">Voters</div>
            <div class="postUpVoters">
                <div class="upvoterInfo">
                    <div class="userAvatar">
                        <div class="noAvatar" style="background-color:rgb(154, 153, 204);">B</div>
                    </div>
                    <div class="userName">Benny blue</div>
                </div>
                <div class="upvoterInfo">
                    <div class="userAvatar">
                        <div class="noAvatar" style="background-color:rgb(154, 153, 204);">B</div>
                    </div>
                    <div class="userName">Benny blue</div>
                </div>
                <div class="upvoterInfo">
                    <div class="userAvatar">
                        <div class="noAvatar" style="background-color:rgb(154, 153, 204);">B</div>
                    </div>
                    <div class="userName">Benny blue</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script></script>

<style>

.sidebarContainer {
    background-color: #FCFCFC;
    border-radius: 10px;
    width: 300px;
    padding: 20px;
    height: fit-content;
    margin-right: 18px;
    border: 2px solid #d9d9d9;
}

.sidebarCatagory{
    margin: 0 0 25px;
}

.sidebarCataHeader{
    margin: 0 0 5px;
}

.sidebarVoteHeader{
    margin: 0 0 10px;
}

.upvoterInfo {
    display: flex;
    flex-direction: row;
}

.userAvatar {
    min-width: 26px;
    width: 26px;
    height: 26px;
    border-radius: 100px;
    position: relative;
    z-index: 1;
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
}

.postUpVoters{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

</style>