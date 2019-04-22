<template>
    <div>
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
                <td v-on:click="setId(props.item.id, props.item.name)">{{ props.item.name }}</td>
                <td v-on:click="setId(props.item.id, props.item.name)">{{props.item.surname}}</td>
                <td class="text-xs-right" v-on:click="setId(props.item.id, props.item.name)">{{ props.item.phoneNumber }}</td>
            </template>
            <v-alert v-slot:no-results :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </v-card>
        <br/>
        <div> <h3> Selected parent: {{this.name}}</h3></div>
        <b-form-group id="InputGroup" label-for="Input8">
            <b-form-input
                    id="Input8"
                    type="text"
                    v-model="funds"
                    required
                    size="lg"
                    placeholder="Enter sum to add for" />
        </b-form-group>
        <b-button variant="primary" @click="transfer">Transfer</b-button>
        <b-button variant="danger" @click="reset">Reset</b-button>
    </div>
</template>
<script>
    import config from 'config'

    export default {
        data() {
            return {
                id: '',
                search: '',
                funds:'',
                name:'not selected',
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
            setId(id, name) {
                this.id = id;
                this.name=name;
            },
            transfer(){
                form={
                    'funds': this.funds,
                    'id': this.id
                };
                data1 = JSON.stringify(form);

            },
            reset(){
                this.id='';
                this.funds='';
                this.search='';
                this.name='not selected';
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
            }
        },
        mounted(){
            this.sendRequest()
        }
    }
</script>
