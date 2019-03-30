<template>
    <div>
    <div v-if="!editing">
        <span class='text' @click="enableEditing">{{this.value}}</span>
    </div>
    <div v-if="editing">
        <input v-model="tempValue" class="input" v-on:keyup.enter="saveEdit"/>
    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Vuetify from 'vuetify'


    Vue.use(Vuetify)

    export default {
        props: ['value'],
        data() { return{
            tempValue: null,
            editing: false
        }},
        methods: {
            enableEditing: function () {
                this.tempValue = this.value;
                this.editing = true;
            },
            disableEditing: function () {
                this.tempValue = null;
                this.editing = false;
            },
            saveEdit: function () {
                this.value = this.tempValue;
                console.log(this.value);
                this.disableEditing();
            }
        }
    }
</script>

<style scoped>

</style>