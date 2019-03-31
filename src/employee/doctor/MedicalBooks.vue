<template>
<div id="app" style="box-sizing:inherit !important;">
    <head>
        <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
    </head>
    <v-app id="inspire" style="box-sizing:inherit !important;">
        <v-card>
            <v-card-title>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.calories" label="Height"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.fat" label="Weight"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.carbs" label=" "></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.protein" label=" "></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-data-table
                        :headers="headers"
                        :items="desserts"
                        :search="search"
                        class="elevation-1"
                        style="box-sizing:inherit !important;"
                >
                    <template v-slot:items="props" style="box-sizing:inherit !important;">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.calories }}</td>
                        <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right" style="white-space: nowrap"><v-btn color="blue darken-1" flat @click="openVaccine">Vaccine</v-btn></td>
                        <td class="text-xs-right"><v-btn color="blue darken-1" flat @click="openDisease">Disease</v-btn></td>
                        <td class="text-xs-right"><v-btn color="blue darken-1" flat @click="openAllergy">Allergy</v-btn></td>
                        <td class="justify-center layout px-0">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                    small
                                    @click="deleteItem(props.item)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-card-title>
        </v-card>
    </v-app>
</div>
</template>
<script>
    import {EventBus} from '../../_services/event-bus'
    export default {
        data () {
            return {
                search: '',
                        dialog: false,
                        headers: [
                            {
                                text: 'Name',
                                align: 'left',
                                sortable: false,
                                value: 'name'
                            },
                            { text: 'Height', value: 'calories' },
                            { text: 'Weight', value: 'fat' },
                            { text: '', value: 'carbs' },
                            { text: '', value: 'protein' },
                            { text: '', value: 'name', sortable: false }
                        ],
                        desserts: [],
                        editedIndex: -1,
                        editedItem: {
                            name: '',
                            calories: 0,
                            fat: 0,
                            carbs: 0,
                            protein: 0
                        },
                        defaultItem: {
                            name: '',
                            calories: 0,
                            fat: 0,
                            carbs: 0,
                            protein: 0
                        }
                    }},

                    computed: {
                        formTitle () {
                            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
                        }
                    },

                    watch: {
                        dialog (val) {
                            val || this.close()
                        }
                    },

                    created () {
                        this.initialize()
                    },

                    methods: {
                        initialize () {
                            this.desserts = [
                                {
                                    name: 'Frozen Yogurt',
                                    calories: 159,
                                    fat: 6.0,
                                    carbs: 24,
                                    protein: 4.0
                                },
                                {
                                    name: 'Ice cream sandwich',
                                    calories: 237,
                                    fat: 9.0,
                                    carbs: 37,
                                    protein: 4.3
                                },
                                {
                                    name: 'Eclair',
                                    calories: 262,
                                    fat: 16.0,
                                    carbs: 23,
                                    protein: 6.0
                                },
                                {
                                    name: 'Cupcake',
                                    calories: 305,
                                    fat: 3.7,
                                    carbs: 67,
                                    protein: 4.3
                                },
                                {
                                    name: 'Gingerbread',
                                    calories: 356,
                                    fat: 16.0,
                                    carbs: 49,
                                    protein: 3.9
                                },
                                {
                                    name: 'Jelly bean',
                                    calories: 375,
                                    fat: 0.0,
                                    carbs: 94,
                                    protein: 0.0
                                },
                                {
                                    name: 'Lollipop',
                                    calories: 392,
                                    fat: 0.2,
                                    carbs: 98,
                                    protein: 0
                                },
                                {
                                    name: 'Honeycomb',
                                    calories: 408,
                                    fat: 3.2,
                                    carbs: 87,
                                    protein: 6.5
                                },
                                {
                                    name: 'Donut',
                                    calories: 452,
                                    fat: 25.0,
                                    carbs: 51,
                                    protein: 4.9
                                },
                                {
                                    name: 'KitKat',
                                    calories: 518,
                                    fat: 26.0,
                                    carbs: 65,
                                    protein: 7
                                }
                            ]
                        },

                        editItem (item) {
                            this.editedIndex = this.desserts.indexOf(item)
                            this.editedItem = Object.assign({}, item)
                            this.dialog = true
                        },

                        deleteItem (item) {
                            const index = this.desserts.indexOf(item)
                            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
                        },

                        close () {
                            this.dialog = false
                            setTimeout(() => {
                                this.editedItem = Object.assign({}, this.defaultItem)
                                this.editedIndex = -1
                            }, 300)
                        },

                        save () {
                            if (this.editedIndex > -1) {
                                Object.assign(this.desserts[this.editedIndex], this.editedItem)
                            } else {
                                this.desserts.push(this.editedItem)
                            }
                            this.close()
                        },
                        openVaccine(){
                            EventBus.$emit('load', 'VaccineList')
                        },
                        openDisease(){
                            EventBus.$emit('load', 'DiseaseList')
                        },
                        openAllergy(){
                            EventBus.$emit('load', 'AllergyList')
                        }
                    }

    }
</script>