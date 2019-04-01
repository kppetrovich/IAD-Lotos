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
                :items="parents"
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
                parents: [

                ]
            }
        },
        methods: {
            setId(id) {
                this.id = id;
                if (this.what == 'first') {
                    EventBus.$emit('setId1', this.id)
                }
                if (this.what == 'second') {
                    EventBus.$emit('setId2', this.id)
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

                return fetch(`${config.apiUrl}/find/parent`, requestOptions)
                    .then(this.handleResponse);
            },
            handleResponse(response) {
                response.text().then(text => {
                    this.parents = this.parents.concat(JSON.parse(text));
                });
                /*return response.text().then(text => {
                    if (!response.ok && response.status === 403) {
                        const error = "Invalid login or password, please try again"
                        console.log(error)
                    }
                    const data = text && JSON.parse(text);
                    if (!response.ok) {
                        if (response.status === 401) {
                            logout();
                            location.reload(true);
                        }
                        const error = (data && data.message) || response.statusText;
                        console.log(error)
                    }
                    return data;
                }) */
            }
        },
        mounted(){
            this.sendRequest()
        }
    }
</script>