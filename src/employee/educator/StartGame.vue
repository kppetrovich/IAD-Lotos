<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <div>Child 1: {{this.form.child1.id}}</div>
    <b-button v-on:click="loadSearchOfChild(1)"> Set the first fighter</b-button>
        <div v-if="isSearchOfChild1"><SearchOfChildren what="first"></SearchOfChildren></div>
    <div>Child 2: {{this.form.child2.id}} </div>
    <b-button v-on:click="loadSearchOfChild(2)"> Set the second fighter</b-button>
    <div v-if="isSearchOfChild2"><SearchOfChildren what="second"></SearchOfChildren></div>
            <br/>
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
    import {EventBus} from "../../_services/event-bus";
    import SearchOfChildren from "./SearchOfChildren";
    export default {
        name: "StartGame",
        components: {SearchOfChildren},
        data() {
            return {
                fightingLog: [],
                show: true,
                gottenResponse: '',
                isSearchOfChild1: false,
                isSearchOfChild2: false,
                isGotResponse: false,
                form: {
                    child1: {id: ''},
                    child2: {id: ''}
                },
            }
        },

        methods: {
            onSubmit(evt) {
                let childArr=[];
                childArr.push(this.form.child1);
                childArr.push(this.form.child2);
                evt.preventDefault()
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(childArr)
                };

                return fetch(`${config.apiUrl}/game/start`, requestOptions)
                    .then(this.handleResponse).then(this.setResponse);

            },
            handleResponse(response) {
                response.text().then(text => {
                    this.fightingLog = this.fightingLog.concat(JSON.parse(text));
                });
            },
            setResponse(response){
                this.gottenResponse=response;
                this.isGotResponse=true;
                let jsonLog=JSON.stringify(this.fightingLog);
                jsonLog=JSON.parse(jsonLog);
                this.fightingLog=jsonLog[0]['hitList']
                console.log(this.fightingLog)
            },
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.child1.id = ''
                this.form.child2.id = ''
                this.gottenResponse=''
                this.isGotResponse=false
                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            loadSearchOfChild(type) {
                if (type === 1) {
                    this.isSearchOfChild2 = false;
                    this.isSearchOfChild1 = true;
                }
                if (type === 2) {
                    this.isSearchOfChild1 = false;
                    this.isSearchOfChild2 = true;
                }
            },
            setId1(id) {
                this.form.child1.id = id;

            },
            setId2(id) {
                this.form.child2.id = id;
            },

        },

        components: {
            SearchOfChildren
        },
        mounted() {
                EventBus.$on('setId1', this.setId1),
                EventBus.$on('setId2', this.setId2)
        },

    }
</script>

<style scoped>

</style>