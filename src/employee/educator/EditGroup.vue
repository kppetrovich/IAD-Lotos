
    <template>
        <VueEditortable :data="{ columns, options }"></VueEditortable>
    </template>

<script>
    import VueEditortable from "vue-editortable"

    export default {
        data() {
            return {
                columns: [
                    {
                        title: 'Id',
                        name: 'id',
                        editable: false,
                    },
                    {
                        title: 'Firstname',
                        name: 'firstname',
                        editable: true,
                    },
                    {
                        title: 'Lastname',
                        name: 'lastname',
                        editable: true,
                    },
                    {
                        title: 'Email',
                        name: 'email',
                        editable: true,
                    },
                ],
                options: {
                    showSearchFilter: true,
                    requests: {
                        allUrl: 'http://api.dev/api/users',
                    },
                },
            };
        },
        components:{VueEditortable}
    }
</script>

<style scoped>

</style>