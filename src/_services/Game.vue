<template>
    <div id="game">
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
        </head>
        <div v-if="isGotResponse==true">
        <div>
            <v-container style="max-width: 600px;">
                <v-timeline dense clipped>
                    <v-timeline-item
                            fill-dot
                            class="white--text mb-5"
                            color="orange"
                            large
                    >
                        <template v-slot:icon>
                            <span>JL</span>
                        </template>
                    </v-timeline-item>

                    <v-slide-x-transition
                            group
                    >
                        <v-timeline-item
                                v-for="event in timeline"
                                :key="event.id"
                                class="mb-3"
                                color="pink"
                                small
                        >
                            <v-layout justify-space-between>
                                <v-flex xs7 v-text="event.text"></v-flex>
                                <v-flex xs5 text-xs-right v-text="event.time"></v-flex>
                            </v-layout>
                        </v-timeline-item>
                    </v-slide-x-transition>
                </v-timeline>
            </v-container>
        </div>
    </div>
    </div>
        </template>
<script>
    import config from 'config'
    import 'vuetify/dist/vuetify.min.css'
    import Vue from 'vue'
    import Vuetify from 'vuetify'
    Vue.use(Vuetify)
    export default {
        data: () => ({
            events: [],
            input: null,
            nonce: 0,
            fightingLog: [],
            isGotResponse: false,
            gottenResponse: '',
            polling: null,
            radiantName: '',
            direName: '',
        }),

        computed: {
            timeline () {
                return this.events.slice().reverse()
            }
        },
        mounted(){
            this.askServer();
        },
        created(){
            this.pollData();
                },
        methods: {
            comment () {
                const time = (new Date()).toTimeString();
                if(this.nonce==this.fightingLog.length){
                    clearInterval(this.polling);
                }
                this.events.push({
                    id: ++this.nonce,
                    text: "Damage value: "+ this.fightingLog[this.nonce].damage + " was taken by "+ this.fightingLog[this.nonce].hitDirection.replace("TO_DIRE", this.direName).replace("TO_RADIANT", this.radiantName),
                    time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
                        return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
                    })
                })
                this.input = null
            },
            askServer: function () {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                };

                return fetch(`${config.apiUrl}/game/get-last`, requestOptions)
                    .then(this.handleGameLog).then(this.setResponse);
            },
            handleGameLog(response){
                response.text().then(text => {

                    this.fightingLog = this.fightingLog.concat(JSON.parse(text));
                    console.log(this.fightingLog[0]['dire'].name);
                    this.direName=this.fightingLog[0]['dire'].name;
                    console.log(this.fightingLog[0]['radiant'].name);
                    this.radiantName=this.fightingLog[0]['radiant'].name;
                    this.fightingLog=this.fightingLog[0]['hitList']
                    for (let i = 0; i < this.fightingLog.length; i++) {
                        this.fightingLog[i]['id'] = i;
                    }
                });
            },
            setResponse(response){
                this.gottenResponse=response;
                this.isGotResponse=true;

            },
            pollData () {
                this.polling = setInterval(() => {
                    this.comment()
                }, 3000)
            }
        },

    }

    </script>
