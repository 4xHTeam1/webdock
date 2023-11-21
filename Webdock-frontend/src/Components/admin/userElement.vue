<template>
    <!-- userOverviewContainer er den div som indeholder de elementer som skal have data fra users -->
    <div class="userOverviewContainer">
        <div class="user_ID">#404</div>
        <!-- userInfoContainer indeholder users firstname og lastname samtidigt med indeholder avatarURL som skal hentes fra databasen -->
        <div class="userInfoContainer">
            <div class="usersAvatar">
                <div class="noneAvatar" style="background-color:#9cb;">L</div>
            </div>
            <div class="firstName">Lars</div>
            <div class="lastName"> Larsen</div>
        </div>
        <div class="userEmail">Lars@gmail.com</div>
        <div class="userRole">User</div>
        <!-- userSettings, er den div som har tandhjulet og skal have en dropdown menu når man klikker på svg'en dropdown menuen skal laves via script og have styling -->
        <div class="userSettings">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear-fill"
                viewBox="0 0 16 16">
                <path
                    d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.userOverviewContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #24AB95;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    gap: 20px;
    padding: 40px;
    color: white;
    z-index: 1;
}

.userInfoContainer {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.usersAvatar {
    min-width: 26px;
    width: 26px;
    height: 26px;
    border-radius: 100px;
    position: relative;
    z-index: 1;
    margin: 0 10px 0 10px;
}

.noneAvatar {
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
</style>