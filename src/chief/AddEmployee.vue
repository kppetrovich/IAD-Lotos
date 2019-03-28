<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="InputGroup1"
                    label="Email address:"
                    label-for="Input1"
            >
                <b-form-input
                        id="Input1"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email" />
            </b-form-group>

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
            <b-form-group id="InputGroup5" label="Passport:" label-for="Input5">
                <b-form-input
                        id="Input5"
                        type="text"
                        v-model="form.passport"
                        required
                        placeholder="Enter passport" />
            </b-form-group>
            <b-form-group id="InputGroup6" label="Inn:" label-for="Input6">
                <b-form-input
                        id="Input6"
                        type="text"
                        v-model="form.inn"
                        required
                        placeholder="Enter inn" />
            </b-form-group>
            <b-form-group id="InputGroup7" label="Phone:" label-for="Input7">
                <b-form-input
                        id="Input7"
                        type="text"
                        v-model="form.phone"
                        required
                        placeholder="Enter phone" />
            </b-form-group>
            <b-form-group id="InputGroup8" label="Salary:" label-for="Input8">
                <b-form-input
                        id="Input8"
                        type="text"
                        v-model="form.salary"
                        required
                        placeholder="Enter salary" />
            </b-form-group>
            <b-form-group id="InputGroup8" label="Type:" label-for="Input8">
            <b-form-select v-model="form.selectedType" :options="options" />
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
                    email: '',
                    name: '',
                    surname: '',
                    checked: [],
                    passport: '',
                    inn: '',
                    salary: '',
                    phone: '',
                    selectedType: null
                },
                options:[
                    { value: null, text: 'Select the type' },
                    { value: 'Babysitter', text: 'Babysitter' },
                    { value: 'Educator', text: 'Educator' },
                    { value: 'Security', text: 'Security' },
                    { value: 'Teacher', text: 'Teacher' },
                    { value: 'Chief', text: 'Chief' },
                ],
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
                this.form.email = ''
                this.form.name = ''
                this.form.surname=''
                this.form.checked = []
                this.form.inn=''
                this.form.passport=''
                this.form.salary=''
                this.form.phone=''
                this.form.selectedType= null
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>