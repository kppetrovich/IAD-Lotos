<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="InputGroup2" label="Email: " label-for="Input2">
                <b-form-input
                        id="Input2"
                        type="email"
                        v-model="form.client.username"
                        required
                        placeholder="Enter email" />
            </b-form-group>
            <b-form-group id="InputGroup2" label="Password:" label-for="Input2">
                <b-form-input
                        id="Input2"
                        type="text"
                        v-model="form.client.password"
                        required
                        placeholder="Enter password" />
            </b-form-group>
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
                    <b-form-select v-model="form.group.id" :options="options" :select-size="4"></b-form-select>
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
    import config from 'config'
    export default {
        data() {
            return {
                isSearchOfParent1: false,
                isSearchOfParent2: false,
                form: {
                    client:{
                        username: '',
                        password: '',
                        role: 'CHILDREN'
                    },
                    name: '',
                    surname: '',
                    group: {id: ''},
                    parent1: {id: ''},
                    parent2:{id: ''}
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
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(this.form)
                };

                return fetch(`${config.apiUrl}/registration/children`, requestOptions)

            },
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.name = ''
                this.form.surname=''
                this.form.group.id=''
                this.form.parent1.id=''
                this.form.parent2.id=''
                this.form.client.username=''
                this.from.client.password=''
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
                this.form.parent1.id=id;

            },
            setId2(id){
                this.form.parent2.id=id;
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
                    this.options=JSON.parse(text).map(element=> {
                        return {
                            value: element.id,
                            text: element.name,
                        }
                    })
                });
            }
        },
        components:{
            SearchOfParent
        },
        mounted(){
            this.askForGroups(),
            EventBus.$on('setId1', this.setId1),
            EventBus.$on('setId2', this.setId2)
        },

    }

</script>