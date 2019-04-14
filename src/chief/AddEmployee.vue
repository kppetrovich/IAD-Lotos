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
                        v-model="form.client.username"
                        required
                        placeholder="Enter email" />
            </b-form-group>
            <b-form-group
                    id="InputGroup11"
                    label="Password:"
                    label-for="Input1"
            >
                <b-form-input
                        id="Input11"
                        type="password"
                        v-model="form.client.password"
                        required
                        placeholder="Enter password" />
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
            <b-form-group id="InputGroup9" label="Type:" label-for="Input9">
            <b-form-select v-model="form.typeEmployee" :options="options" />
            </b-form-group>


            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <div v-if="isGotResponse">
                <div v-if="gottenResponse==='Success'">
                    <b-alert show variant="success">{{gottenResponse}}</b-alert>
                </div>
                <div v-if="gottenResponse!='Success'">
                    <b-alert show variant="danger">{{gottenResponse}}</b-alert>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
    import config from 'config'
    export default {
        data() {
            return {
                form: {
                    name: '',
                    surname: '',
                    passport: '',
                    inn: '',
                    salary: '',
                    phone: '',
                    typeEmployee: null,
                    client:{
                        username: '',
                        password:'',
                        role: this.selectedType
                    }
                },
                options:[
                    { value: null, text: 'Select the type' },
                    { value: 'BABYSITTER', text: 'Babysitter' },
                    { value: 'EDUCATOR', text: 'Educator' },
                    { value: 'SECURITY', text: 'Security' },
                    { value: 'TEACHER', text: 'Teacher' },
                    { value: 'CHIEF', text: 'Chief' },
                    { value: 'DOCTOR', text: 'Doctor' },
                    {value: 'COOKER', text: 'Cooker'}
                ],
                show: true,
                gottenResponse: '',
                isGotResponse: false,

            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(this.form)
                };

                return fetch(`${config.apiUrl}/registration/employee`, requestOptions)
                    .then(this.handleResponse).then(this.setResponse);

            },
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.client.username = ''
                this.form.client.password=''
                this.form.name = ''
                this.form.surname=''
                this.form.checked = []
                this.form.inn=''
                this.form.passport=''
                this.form.salary=''
                this.form.phone=''
                this.form.typeEmployee= null
                this.gottenResponse=''
                this.isGotResponse=false
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            handleResponse(response) {
                const error= "Success"
                if (!response.ok) {
                    if (response.status === 409) {
                        const error = "Username already exists";
                        return error
                    }
                    if (response.status === 401) {
                        const error = "Someone uses your account, try again later";
                        return error
                    }
                    if (response.status === 403) {
                        const error = 'Не лазь, ***** *****, оно тебя сожрет ';
                        return error
                    }}

                return error;
            },
            setResponse(response){
                this.gottenResponse=response;
                this.isGotResponse=true;
            }
        }
    }
</script>