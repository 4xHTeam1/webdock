<template>
    <div class="overview-area">
        <div class="feature-container">
            <div class="feature-heading">bandwidth usage</div>
            <div class="feature-status">planned</div>
            <div class="feature-text">Can we please have an reporting tab which shows monthly bandwidth usage for a server ...</div>
        </div>
    </div>
</template>

<script>

</script>

<style>
.overview-area{
    background-color: #FCFCFC;
    border-radius: 10px;
    width: 600px;
    height: 900px;
}

.feature-container{
    display: flex;
    flex-direction: column;
    padding: 18px;
}

.feature-heading{
    font-size: 2rem;
}

.feature-status{
    font-size: 1rem;
    color: lightblue;
}

.feature-text{
    font-size: 1rem;
    text-overflow: ellipsis;
}
</style>