<template>
    <div>
        <table class="table is-bordered is-striped is-narrow">
            <thead>
            <tr>
                <th>nl</th>
                <th>en</th>
                <th> <i class="fa fa-plus fa-lg fa-fw" @click="onAdd"></i> </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) of rows">
                <td>
                    <editable :item="item.nl" @updated="onUpdate(i,'nl',$event)"></editable>
                </td>
                <td>
                    <editable :item="item.en" @updated="onUpdate(i,'en',$event)"></editable>
                </td>
                <td> <i class="fa fa-trash-o fa-lg fa-fw" @click="onDelete(i,$event)"></i> </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<style>
</style>

<script>
    import editable from './Editable';


    export default {
        data: () => ({
            rows: [ {
                name: 'Tiger Nixon',
                position: 'System Architect',
                office: 'Edinburgh',
                age: '61',
                date: '2011/04/25',
                salary: '$320'
            },
    {
        name: 'Garrett Winters',
            position: 'Accountant',
        office: 'Tokyo',
        age: '63',
        date: '2011/07/25',
        salary: '$170'
    },
    {
        name: 'Ashton Cox',
            position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: '2009/01/12',
        salary: '$86'
    },
    {
        name: 'Cedric Kelly',
            position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        date: '2012/03/29',
        salary: '$433'
    }
    ],
            errors: [],
        }),

        methods: {
            onUpdate: function (row, col, newValue) {
                console.log('update', row, this.rows[row][col], newValue);
                this.rows[row][col] = newValue;
                this.updated = true;
                // ... implement your update function
                // axios.post(url, this.rows[row], config) ...

            },
            onAdd: function () {
                console.log('add');


            }
        },
            components: {
                editable
            },

            // Fetches rows when the component is created.


    }

</script>