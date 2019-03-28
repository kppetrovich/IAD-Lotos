<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group
            id="InputGroup1"
            label="Name:"
            label-for="Input1"
    >
        <b-form-input
                id="Input1"
                type="text"
                v-model="form.name"
                required
                placeholder="Enter name" />
    </b-form-group>
    <b-form-group
            id="InputGroup2"
            label="Expiration date:"
            label-for="Input1"
    >
        <b-form-input
                id="Input2"
                type="text"
                v-model="form.expirationDate"
                required
                placeholder="Enter expiration date" />
    </b-form-group>
    <b-form-group
            id="InputGroup3"
            label="Place:"
            label-for="Input3"
    >
        <b-form-input
                id="Input3"
                type="text"
                v-model="form.place"
                required
                placeholder="Enter place" />
    </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: "",
                    expirationDate: '',
                    place: '',
                }, show: true
            }
        },
                methods: {
                    onSubmit(evt) {
                        evt.preventDefault()
                        alert(JSON.stringify(this.form))
                    },
                    onReset(evt) {
                        evt.preventDefault()
                        /* Reset our form values */
                        this.form.name = ''
                        this.form.place=''
                        this.form.expirationDate=''

                        /* Trick to reset/clear native browser form validation state */
                        this.show = false
                        this.$nextTick(() => {
                            this.show = true
                        })
                    }
                }

    }
</script>

<style scoped>

</style>