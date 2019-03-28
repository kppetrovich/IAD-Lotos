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
                       :items="items"
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
                       <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                           Info modal
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
           <b-form @submit.prevent="setVisible" @reset="onReset" v-if="show">
               <b-form-group
                       id="InputGroup1"
                       label="Email address:"
                       label-for="Input1"
               >
                   <b-form-input
                           id="Input1"
                           type="email"
                           v-model="form.email"
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
               <b-form-group id="InputGroup5" label="Passport:" label-for="Input5">
                   <b-form-input
                           id="Input5"
                           type="text"
                           v-model="form.passport"
                           placeholder="Enter passport" />
               </b-form-group>
               <b-form-group id="InputGroup6" label="Inn:" label-for="Input6">
                   <b-form-input
                           id="Input6"
                           type="text"
                           v-model="form.inn"
                           placeholder="Enter inn" />
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

               <b-button type="Search" variant="primary">Submit</b-button>
               <b-button type="reset" variant="danger">Reset</b-button>
           </b-form>
       </div>
</div>
</template>

<script>
    const items = [
        { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
        { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
        {
            isActive: false,
            age: 9,
            name: { first: 'Mini', last: 'Navarro' },
            _rowVariant: 'success'
        },
        { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
        { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
        { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
        { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
        {
            isActive: true,
            age: 87,
            name: { first: 'Larsen', last: 'Shaw' },
            _cellVariants: { age: 'danger', isActive: 'warning' }
        },
        { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
        { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
        { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
        { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
    ]
    export default {
        data() {
            return {
                items: items,
                fields: [
                    { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' },
                    { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
                    { key: 'isActive', label: 'is Active' },
                    { key: 'actions', label: 'Actions' }
                ],
                currentPage: 1,
                perPage: 5,
                totalRows: items.length,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                modalInfo: { title: '', content: '' }
                ,
                form: {
                    email: '',
                    name: '',
                    surname: '',
                    passport: '',
                    inn: '',
                    salary: '',
                    phone: '',
                },
                show: true,
                visible: false
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
            onSubmit(evt) {
                evt.preventDefault()
                JSON.stringify(this.form)
            },
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.email = ''
                this.form.name = ''
                this.form.surname = ''
                this.form.inn = ''
                this.form.passport = ''
                this.form.salary = ''
                this.form.phone = ''
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            info(item, index, button) {
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