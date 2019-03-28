<template>
    <b-container fluid>

        <!-- Main table element -->
        <b-table
                show-empty
                stacked="md"
                :items="items"
                :fields="fields"
        >
            <template slot="name" slot-scope="row">
                {{ row.value.first }} {{ row.value.last }}
            </template>

            <template slot="Attend" slot-scope="row">
                <EditableField v-bind:value='tempValue'></EditableField>
            </template>

            <template slot="mark" slot-scope="row">
                <EditableField v-bind:value='tempValue'></EditableField>
            </template>
            <template slot="eating_score" slot-scope="row">
                <EditableField v-bind:value='tempValue'></EditableField>
            </template>

        </b-table>
        <b-button class="saveAll" @onclick="saveEdit">Save</b-button>
    </b-container>
</template>

<script>
    import EditableField from "./EditableField";
    import BButton from "bootstrap-vue/src/components/button/button";
    const items = [
        { Attend: true, eating_score: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
        { Attend: false, eating_score: 21, name: { first: 'Larsen', last: 'Shaw' } },
        {
            Attend: false,
            eating_score: 9,
            name: { first: 'Mini', last: 'Navarro' },
        },
        { name: { first: 'Geneva', last: 'Wilson' } },
        {  name: { first: 'Jami', last: 'Carney' } },
        { name: { first: 'Essie', last: 'Dunlap' } },
        { name: { first: 'Thor', last: 'Macdonald' } },
        {name: { first: 'Larsen', last: 'Shaw' }},
        { name: { first: 'Mitzi', last: 'Navarro' } },
        { name: { first: 'Genevieve', last: 'Wilson' } },
        { name: { first: 'John', last: 'Carney' } },
        { name: { first: 'Dick', last: 'Dunlap' } }
    ]

    export default {
        components: {BButton, EditableField},
        data() {
            return {
                tempValue: '-',
                items: items,
                fields: [
                    { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' },
                    { key: 'eating_score', label: 'Eating score', sortable: true, class: 'text-center' },
                    { key: 'Attend', label: 'Attend' },
                    { key: 'mark', label: 'Mark' }
                ],
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
            saveEdit: function () {

            }
        }
    }
</script>