<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="InputGroup2" label="Surname:" label-for="Input2">
                <b-form-input
                        id="Input2"
                        type="text"
                        v-model="form.surname"
                        required
                        placeholder="Enter surname" />
            </b-form-group>
            <b-form-group id="InputGroup4" label="Name:" label-for="Input4">
                <b-form-input
                        id="Input4"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Enter name" />
            </b-form-group>
            <b-form-group id="InputGroup5" label="Medical Book:" label-for="Input4">
                <b-form-input
                        id="Input4"
                        type="text"
                        v-model="form.medicalBook"
                        required
                        placeholder="Enter medical book" />
            </b-form-group>
            <b-form-group id="InputGroup5" label="Group:" label-for="Input5">
                <b-form-input
                        id="Input5"
                        type="text"
                        v-model="form.group"
                        required
                        placeholder="Enter group" />
            </b-form-group>
            <b-form-group id="InputGroup6" label="Parent 1:" label-for="Input6">
                <b-form-input
                        id="Input6"
                        type="text"
                        v-model="form.parent1"
                        required
                        placeholder="Enter the first parent" />
            </b-form-group>
            <b-form-group id="InputGroup7" label="Parent 2:" label-for="Input7">
                <b-form-input
                        id="Input7"
                        type="text"
                        v-model="form.parent2"
                        placeholder="Enter the second parent (optional)" />
            </b-form-group>

            <b-form-group id="Group4">
                <b-form-checkbox-group v-model="form.checked" id="Checks">
                    <b-form-checkbox value="that">Check that out</b-form-checkbox>
                </b-form-checkbox-group>
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
                    name: '',
                    surname: '',
                    checked: [],
                    medicalBook: '',
                    group: '',
                    parent1: '',
                    parent2:''
                },
                show: true
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
                this.form.surname=''
                this.form.checked = []
                this.form.medicalBook=''
                this.form.group=''
                this.form.parent1=''
                this.form.parent2=''
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>