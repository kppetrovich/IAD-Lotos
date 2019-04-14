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
                type="date"
                v-model="form.expirationDate"
                required
                placeholder="Enter expiration date" />
    </b-form-group>
            <div>
                <b-form-select v-model="form.place.id" :options="options" :select-size="4"></b-form-select>
                <div class="mt-3">Selected place: <strong>{{ form.place.id }}</strong></div>
            </div>
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
                gottenResponse:'',
                isGotResponse:false,
                form: {
                    place:{id: null},
                    name: "",
                    expirationDate: '',
                },
                show: true,
                options: [{
                    value: null, text: 'Please, select the place'
                }]
            }
        },
                methods: {
                    onSubmit(evt) {
                        this.form.expirationDate = this.form.expirationDate.toString() + 'T00:00:00.000+03:00';
                        evt.preventDefault();

                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                                'Content-Type': 'application/json'
                            },
                            mode: 'cors',
                            body: JSON.stringify(this.form)
                        };

                        return fetch(`${config.apiUrl}/registration/item`, requestOptions)
                            .then(this.handleResponse).then(this.setResponse);

                    },
                    onReset(evt) {
                        evt.preventDefault()
                        /* Reset our form values */
                        this.form.name = ''
                        this.form.place.id=null
                        this.form.expirationDate=''
                        this.gottenResponse=''
                        this.isGotResponse=false
                        /* Trick to reset/clear native browser form validation state */
                        this.show = false
                        this.$nextTick(() => {
                            this.show = true
                        })
                    },
                    askForPlaces(){
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                                'Content-Type': 'application/json'
                            },
                            mode: 'cors',
                            body: '{}'
                        };

                        return fetch(`${config.apiUrl}/find/place`, requestOptions)
                            .then(this.handleAskForPlaces);
                    },
                   handleAskForPlaces(response){
                       response.text().then(text => {
                           let jsonString =text;
                           jsonString = jsonString.replace(/"id":/g, '"value"'+":");
                           jsonString = jsonString.replace(/"name":/g, '"text"'+":");
                           this.options=this.options.concat(JSON.parse(jsonString));

                       });
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
                },
        created() {
            this.askForPlaces();
        }

    }
</script>

<style scoped>

</style>