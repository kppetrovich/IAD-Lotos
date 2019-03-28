export * from './user.service';
<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app'
    }
</script>
