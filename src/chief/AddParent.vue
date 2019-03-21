<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="exampleInputGroup1"
                    label="Email address:"
                    label-for="exampleInput1"
            >
                <b-form-input
                        id="exampleInput1"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email" />
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Surname:" label-for="exampleInput2">
                <b-form-input
                        id="exampleInput2"
                        type="text"
                        v-model="form.surname"
                        required
                        placeholder="Enter surname" />
            </b-form-group>
            <b-form-group id="exampleInputGroup4" label="Name:" label-for="exampleInput4">
            <b-form-input
                    id="exampleInput4"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="Enter name" />
        </b-form-group>


            <b-form-group id="exampleGroup4">
                <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                    <b-form-checkbox value="me">Check me out</b-form-checkbox>
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
                    checked: []
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
                this.form.email = ''
                this.form.name = ''
                this.form.surname=''
                this.form.checked = []
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>