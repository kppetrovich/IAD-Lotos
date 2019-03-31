<template>
    <div id="app">
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
        </head>
        <div id="app1" style="height: 100px !important">
            <v-app id="date">
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12 lg6>
                            <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="dateFormatted"
                                            label="Date"
                                            hint="MM/DD/YYYY format"
                                            persistent-hint
                                            prepend-icon="event"
                                            @blur="date = parseDate(dateFormatted)"
                                            v-on="on"
                                            widht="10px"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-app>
        </div>
        <v-app id="inspire">
            <div>
                <v-data-table
                        :headers="headers"
                        :items="desserts"
                >
                    <template v-slot:items="props">
                        <td>
                            <v-edit-dialog
                                    :return-value.sync="props.item.name"
                                    lazy
                                    @save="save"
                                    @cancel="cancel"
                                    @open="open"
                                    @close="close"
                            > {{ props.item.name }}
                                <template v-slot:input>
                                    <v-text-field
                                            v-model="props.item.name"
                                            :rules="[max25chars]"
                                            label="Edit"
                                            single-line
                                            counter
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </td>
                        <td>
                            <v-edit-dialog
                                    :return-value.sync="props.item.attended"
                                    lazy
                                    @save="save"
                                    @cancel="cancel"
                                    @open="open"
                                    @close="close"
                            > {{ props.item.attended }}
                                <template v-slot:input>
                                    <v-text-field
                                            v-model="props.item.attended"
                                            :rules="[max25chars]"
                                            label="Edit"
                                            single-line
                                            counter
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </td>

                        <td>
                            <v-edit-dialog
                                    :return-value.sync="props.item.mark"
                                    lazy
                                    @save="save"
                                    @cancel="cancel"
                                    @open="open"
                                    @close="close"
                            > {{ props.item.mark }}
                                <template v-slot:input>
                                    <v-text-field
                                            v-model="props.item.mark"
                                            :rules="[max25chars]"
                                            label="Edit"
                                            single-line
                                            counter
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </td>

                        <td class="text-xs-right">
                            <v-edit-dialog
                                    :return-value.sync="props.item.comment"
                                    large
                                    lazy
                                    persistent
                                    @save="save"
                                    @cancel="cancel"
                                    @open="open"
                                    @close="close"
                            >
                                <div>{{ props.item.comment }}</div>
                                <template v-slot:input>
                                    <div class="mt-3 title">Update Iron</div>
                                </template>
                                <template v-slot:input>
                                    <v-text-field
                                            v-model="props.item.comment"
                                            :rules="[max25chars]"
                                            label="Edit"
                                            single-line
                                            counter
                                            autofocus
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </td>
                    </template>
                </v-data-table>
            </div>
        </v-app>
    </div>
</template>

<script>
    import 'vuetify/dist/vuetify.min.css'
    import Vue from 'vue'
    import Vuetify from 'vuetify'

    Vue.use(Vuetify)
    export default {
        data () {
            return {
                date: new Date().toISOString().substr(0, 10),
                dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
                menu1: false,
                menu2: false,
                snack: false,
                snackColor: '',
                snackText: '',
                max25chars: v => v.length <= 25 || 'Input too long!',
                pagination: {},
                headers: [
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: true,
                        value: 'name'
                    },
                    { text: 'Attended', value: 'attended' },
                    { text: 'Mark', value: 'mark' },
                    { text: 'Comment', value: 'comment' },
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        attended: '+',
                        mark: 4,
                        comment: 'Good boy',
                    },
                    {
                        name: 'Ice cream sandwich',
                        attended: '-',
                        mark: 4,
                        comment: '',
                    },
                    {
                        name: 'Eclair',
                        attended: '-',
                        mark: 5,
                        comment: ' ',
                    },
                    {
                        name: 'Cupcake',
                        attended: '-',
                        mark: 3,
                        comment: '',
                    },
                    {
                        name: 'Gingerbread',
                        attended: '-',
                        mark: 2,
                        comment: '',
                    },
                    {
                        name: 'Jelly bean',
                        attended: '+',
                        mark: 2,
                        comment: '',
                    },
                    {
                        name: 'Lollipop',
                        attended: '-',
                        mark: 5,
                        comment: '',
                    },
                    {
                        name: 'Honeycomb',
                        attended: '-',
                        mark: 3,
                        comment: '',
                    },
                    {
                        name: 'Donut',
                        attended: '+',
                        mark: 5,
                        comment: 'Good girl',
                    },
                    {
                        name: 'KitKat',
                        attended: '+',
                        mark: 5,
                        comment: 'broke the window',
                    }
                ]
            }
        },
        computed: {
            computedDateFormatted () {
                return this.formatDate(this.date)
            }
        },
        watch: {
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            }
        },
        methods: {
            save () {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Data saved'
            },
            cancel () {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Canceled'
            },
            open () {
                this.snack = true
                this.snackColor = 'info'
                this.snackText = 'Dialog opened'
            },
            close () {
            },
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            }
        }
    }
</script>