<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="InputGroup1"
                    label="Name:"
                    label-for="Input1">

                <b-form-input
                        id="Input1"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Enter name" />
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
                gottenResponse: '',
                isGotResponse: false,
                form: {
                    name: "",
                }, show: true
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

                return fetch(`${config.apiUrl}/registration/place`, requestOptions)
                    .then(this.handleResponse).then(this.setResponse);

            },
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.name = '';
                this.gottenResponse='';
                this.isGotResponse=false;

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

<style scoped>

</style>