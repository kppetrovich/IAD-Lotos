<template>
    <v-card>
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
                  rel="stylesheet">
        </head>
        <v-card-title>
            Parent
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="childs"
                :search="search"
        >
            <template v-slot:items="props">
                <td v-on:click="setId(props.item.id)">{{ props.item.name }}</td>
                <td v-on:click="setId(props.item.id)">{{props.item.surname}}</td>
                <td class="text-xs-right" v-on:click="setId(props.item.id)">{{ props.item.phoneNumber }}</td>
            </template>
            <v-alert v-slot:no-results :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </v-card>
</template>
<script>
    import {EventBus} from "../../_services/event-bus";
    import config from 'config'

    export default {
        props: ['what'],
        data() {
            return {
                id: '',
                search: '',
                headers: [
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {text: 'Surname', value: 'surname'},
                    {text: 'Phone Number', value: 'phoneNumber', sortable: true},
                ],
                childs: [

                ]
            }
        },
        methods: {
            setId(id) {
                this.id = id;
                if (this.what == 'first') {
                    EventBus.$emit('setId1', this.id);
                    this.id='';
                    this.search=''
                }
                if (this.what == 'second') {
                    EventBus.$emit('setId2', this.id);
                    this.id='';
                    this.search=''
                }
            },
            sendRequest() {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: '{}'
                };

                return fetch(`${config.apiUrl}/find/child`, requestOptions)
                    .then(this.handleResponse);
            },
            handleResponse(response) {
                response.text().then(text => {
                    this.childs = this.childs.concat(JSON.parse(text));
                });
            }
        },
        mounted(){
            this.sendRequest()
        }
    }
</script>