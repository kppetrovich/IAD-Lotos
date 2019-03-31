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
                        placeholder="Enter email"/>
            </b-form-group>

            <b-form-group id="InputGroup2" label="Surname:" label-for="Input2">
                <b-form-input
                        id="Input2"
                        type="text"
                        v-model="form.surname"
                        required
                        placeholder="Enter surname"/>
            </b-form-group>
            <b-form-group id="InputGroup6" label="PhoneNumber:" label-for="Input6">
                <b-form-input
                        id="Input6"
                        type="text"
                        v-model="form.phoneNumber"
                        required
                        placeholder="Enter name"/>
            </b-form-group>
            <b-form-group id="InputGroup4" label="Name:" label-for="exampleInput4">
                <b-form-input
                        id="Input4"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Enter name"/>
            </b-form-group>
            <b-form-group label="Sex choose">
                <b-form-radio-group required v-model="form.sex" :options="options" plain name="Sex: "/>
            </b-form-group>
            <b-form-group id="InputGroup7" label="Password" label-for="Input7">
                <b-form-input
                        id="Input7"
                        type="text"
                        v-model="form.client.password"
                        required
                        placeholder="Enter password"/>
            </b-form-group>


            <b-form-group id="Group4">
                <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                    <b-form-checkbox value="that">Check that out</b-form-checkbox>
                </b-form-checkbox-group>
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
    import config from 'config';

    export default {
        data() {
            return {
                form: {
                    role: 'PARENT',
                    name: '',
                    surname: '',
                    sex: '',
                    phoneNumber: '',
                    client: {
                        username: '',
                        password: '',
                    }
                },
                show: true,
                options: [{text: 'Female', value: 'f'},
                    {text: 'Male', value: 'm'}],
                gottenResponse:'',
                isGotResponse: false
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

                return fetch(`${config.apiUrl}/registration/parent`, requestOptions)
                    .then(this.handleResponse).then(this.setResponse);

            },
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.client.username = ''
                this.form.name = ''
                this.form.surname = ''
                this.form.checked = []
                this.form.phoneNumber = ''
                this.form.sex = ''
                this.form.client.password = ''
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.gottenResponse=''
                this.isGotResponse=false
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