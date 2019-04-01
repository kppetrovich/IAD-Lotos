<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="InputGroup2" label="Surname:" label-for="Input2">
                <b-form-input
                        id="Input2"
                        type="text"
                        v-model="form.surname"
                        required
                        placeholder="Enter surname" />
            </b-form-group>
            <b-form-group id="InputGroup4" label="Name:" label-for="Input4">
                <b-form-input
                        id="Input4"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Enter name" />
            </b-form-group>
            <template>
                <div>Group:</div>
                <div>
                    <b-form-select v-model="form.group" :options="options" :select-size="4"></b-form-select>
                </div>
            </template>
            <div>Parent 1:</div>
            <b-button v-on:click="loadSearchOfParent(1)"> Set the first parent</b-button>
            <div v-if="isSearchOfParent1"><SearchOfParent what="first"></SearchOfParent></div>
            <div>Parent 2:</div>
            <b-button v-on:click="loadSearchOfParent(2)"> Set the second parent</b-button>
            <div v-if="isSearchOfParent2"><SearchOfParent what="second"></SearchOfParent></div>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import SearchOfParent from '../chief/page_components/SearchOfParent.vue'
    import {EventBus} from "../_services/event-bus";

    export default {
        data() {
            return {
                isSearchOfParent1: false,
                isSearchOfParent2: false,
                form: {
                    name: '',
                    surname: '',
                    group: '',
                    parent1: '',
                    parent2:''
                },
                show: true,
                options: [
            { value: 'a', text: "A" },
            { value: 'b', text: 'Default Selected Option' },]

        }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.name = ''
                this.form.surname=''
                this.form.group=''
                this.form.parent1=''
                this.form.parent2=''
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            loadSearchOfParent(type){
                if(type===1){
                    this.isSearchOfParent2=false;
                    this.isSearchOfParent1=true;
                }
                if(type===2){
                    this.isSearchOfParent1=false;
                    this.isSearchOfParent2=true;
                }
            },
            setId1(id){
                this.form.parent1=id;

            },
            setId2(id){
                this.form.parent2=id;
            },
            askForGroups(){
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: '{}'
                };

                return fetch(`${config.apiUrl}/find/group`, requestOptions)
                    .then(this.handleAskForGroups);
            },
            handleAskForGroups(response){
                response.text().then(text => {

                });
            }
        },
        components:{
            SearchOfParent
        },
        mounted(){
            this.askForGroups,
            EventBus.$on('setId1', this.setId1),
            EventBus.$on('setId2', this.setId2)
        },

    }

</script>