<template>
   <div>
       <div v-show="this.visible">
           <hr>
           <b-container fluid>
               <!-- User Interface controls -->
               <b-row>
                   <b-col md="6" class="my-1">
                       <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                           <b-input-group>
                               <b-form-input v-model="filter" placeholder="Type to Search" />
                               <b-input-group-append>
                                   <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                               </b-input-group-append>
                           </b-input-group>
                       </b-form-group>
                   </b-col>

                   <b-col md="6" class="my-1">
                       <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
                           <b-input-group>
                               <b-form-select v-model="sortBy" :options="sortOptions">
                                   <option slot="first" :value="null">-- none --</option>
                               </b-form-select>
                               <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                                   <option :value="false">Asc</option> <option :value="true">Desc</option>
                               </b-form-select>
                           </b-input-group>
                       </b-form-group>
                   </b-col>

                   <b-col md="6" class="my-1">
                       <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
                           <b-input-group>
                               <b-form-select v-model="sortDirection" slot="append">
                                   <option value="asc">Asc</option> <option value="desc">Desc</option>
                                   <option value="last">Last</option>
                               </b-form-select>
                           </b-input-group>
                       </b-form-group>
                   </b-col>

                   <b-col md="6" class="my-1">
                       <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                           <b-form-select :options="pageOptions" v-model="perPage" />
                       </b-form-group>
                   </b-col>
               </b-row>

               <!-- Main table element -->
               <b-table
                       show-empty
                       stacked="md"
                       :items="this.peoples"
                       :fields="fields"
                       :current-page="currentPage"
                       :per-page="perPage"
                       :filter="filter"
                       :sort-by.sync="sortBy"
                       :sort-desc.sync="sortDesc"
                       :sort-direction="sortDirection"
                       @filtered="onFiltered"
               >
                   <template slot="name" slot-scope="row">
                       {{ row.value.first }} {{ row.value.last }}
                   </template>

                   <template slot="isActive" slot-scope="row">
                       {{ row.value ? 'Yes :)' : 'No :(' }}
                   </template>

                   <template slot="actions" slot-scope="row">
                       <b-button size="sm" @click="openProfile(row.item, row.index, $event.target)" class="mr-1">
                           Open Profile
                       </b-button>
                       <b-button size="sm" @click="row.toggleDetails">
                           {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                       </b-button>
                   </template>

                   <template slot="row-details" slot-scope="row">
                       <b-card>
                           <ul>
                               <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                           </ul>
                       </b-card>
                   </template>
               </b-table>

               <b-row>
                   <b-col md="6" class="my-1">
                       <b-pagination
                               :total-rows="totalRows"
                               :per-page="perPage"
                               v-model="currentPage"
                               class="my-0"
                       />
                   </b-col>
               </b-row>

               <!-- Info modal -->
               <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
                   <pre>{{ modalInfo.content }}</pre>
               </b-modal>
           </b-container>
       </div>
       <div>
           <hr>
           <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
               <b-form-select v-model="form.client.role" :options="options" required>
                   <template slot="first">
                       <option :value="null" disabled>-- Please select role --</option>
                   </template>
               </b-form-select>
               <br/>
               <b-form-group
                       id="InputGroup1"
                       label="Email address:"
                       label-for="Input1"
               >
                   <b-form-input
                           id="Input1"
                           type="email"
                           v-model="form.client.username"
                           placeholder="Enter email" />
               </b-form-group>

               <b-form-group id="InputGroup2" label="Surname:" label-for="Input2">
                   <b-form-input
                           id="Input2"
                           type="text"
                           v-model="form.surname"
                           placeholder="Enter surname" />
               </b-form-group>
               <b-form-group id="InputGroup4" label="Name:" label-for="Input4">
                   <b-form-input
                           id="Input4"
                           type="text"
                           v-model="form.name"
                           placeholder="Enter name" />
               </b-form-group>
               <b-form-group id="InputGroup7" label="Phone:" label-for="Input7">
                   <b-form-input
                           id="Input7"
                           type="text"
                           v-model="form.phone"
                           placeholder="Enter phone" />
               </b-form-group>

               <b-form-group id="Group4">
                   <b-form-checkbox-group v-model="form.checked" id="Checks">
                       <b-form-checkbox value="that">Check that out</b-form-checkbox>
                   </b-form-checkbox-group>
               </b-form-group>

               <b-button type="submit" variant="primary">Search</b-button>
               <b-button type="reset" variant="danger">Reset</b-button>
               <div v-if="isGotResponse">
                   <div v-if="gottenResponse==='Success'">
                       <b-alert show variant="success">{{gottenResponse}}</b-alert>
                   </div>
                   <div v-if="gottenResponse!='Success'">
                       <b-alert show variant="danger">{{gottenResponse}}</b-alert>
                   </div>
               </div>
           </b-form>
       </div>
</div>
</template>

<script>
    import config from 'config';
    const items = [
        { phone: '89181825260', username: 'paulk@gmail.com', name: { first: 'Mitzi', last: 'Navarro' } },

    ]
    export default {
        data() {
            return {
                items: items,
                fields: [
                    { key: 'name', label: 'Person Full name', sortable: true},
                    { key: 'phone', label: 'Person phone number', sortable: true, class: 'text-center' },
                    { key: 'username', label: 'Person email', sortable: true },
                    { key: 'actions', label: 'Actions' }
                ],
                peoples:[{}],

                currentPage: 1,
                gottenResponse: '',
                isGotResponse: false,
                perPage: 5,
                totalRows: items.length,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                urlForAsk: '',
                modalInfo: { title: '', content: '' }
                ,
                form: {
                    client:{ username: '', role: null},
                    name: '',
                    surname: '',
                    phone: '',
                },
                show: true,
                visible: false,
                options: [
                    { value: 'PARENT', text: 'Parent' },
                    { value: 'CHIEF', text: 'Chief' },
                    { value: 'TEACHER', text: 'Teacher' },
                    { value: 'BABYSITTER', text: 'Babysitter' },
                    { value: 'CHILD', text: 'Child' },
                    { value: 'COOKER', text: 'Cooker' },
                    { value: 'DOCTOR', text: 'Doctor' },
                    { value: 'SECURITY', text: 'Security' },
                    { value: 'EDUCATOR', text: 'Educator' },
                ]
            }
        },
        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return { text: f.label, value: f.key }
                    })
            }
        },
        methods: {
            setVisible: function () {
                this.visible = true;

            },
            setUrl: function(){
                if(this.form.client.role=='PARENT'){
                    this.urlForAsk='/find/parent';}
                if(this.form.client.role=='CHIEF'){
                    this.urlForAsk='/find/employee';}
                if(this.form.client.role=='CHILD'){
                    this.urlForAsk='/find/child';}
                if(this.form.client.role=='TEACHER'){
                    this.urlForAsk='/find/employee';}
                if(this.form.client.role=='BABYSITTER'){
                    this.urlForAsk='/find/employee';}
                if(this.form.client.role=='COOKER'){
                    this.urlForAsk='/find/employee';}
                if(this.form.client.role=='DOCTOR'){
                    this.urlForAsk='/find/employee';}
                if(this.form.client.role=='SECURITY'){
                    this.urlForAsk='/find/employee';}
                if(this.form.client.role=='EDUCATOR'){
                    this.urlForAsk='/find/employee';}
            },
            onSubmit(evt) {
                this.setUrl();
                evt.preventDefault();
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(this.form)
                };

                return fetch(`${config.apiUrl}${this.urlForAsk}`, requestOptions)
                    .then(this.handleResponse).then(this.setResponse).then(this.setVisible);

            },
            handleResponse(response) {
                const error= "Success"
                response.text().then(text => {
                    this.peoples=JSON.parse(text).map(element=> {
                        return {
                            id: element.id,
                           phone: element.phoneNumber,
                            username: element.client.username,
                            name:{
                               first: element.name,
                                last: element.surname
                            }
                        }
                    })
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        const error = "Someone uses your account, try again later";
                        return error
                    }
                    if (response.status === 403) {
                        const error = 'Не лазь, ***** *****, оно тебя сожрет ';
                        return error
                    }}

                return error;
            },
            setResponse(response){
                this.gottenResponse=response;
                this.isGotResponse=true;
            },
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.email = '';
                this.form.name = '';
                this.form.surname = '';
                this.form.phone = '';
                this.peoples=[];
                this.form.client.role=null
                this.gottenResponse='';
                this.isGotResponse=false;
                this.visible=false
                this.urlForAsk=''
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            openProfile(item, index, button) {
                this.modalInfo.title = `Row index: ${index}`
                this.modalInfo.content = JSON.stringify(item, null, 2)
                this.$root.$emit('bv::show::modal', 'modalInfo', button)
            },
            resetModal() {
                this.modalInfo.title = ''
                this.modalInfo.content = ''
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        }
    }

</script>

<style scoped>

</style>