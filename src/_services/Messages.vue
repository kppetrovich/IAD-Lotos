<template>
    <div>
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Material+Icons" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/2.0.46/css/materialdesignicons.min.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons-wind.min.css" />
            <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
            <link rel="stylesheet" href="https://afeld.github.io/emoji-css/emoji.css" />
        </head>
        <div><vc-layout :spacing="spacing" style="max-width: 950px; max-height: 650px">
            <vc-col :span="5">
                <vc-toolbar narrow>
                    <vc-toolbar-title>Users</vc-toolbar-title>
                </vc-toolbar>
                <vc-select
                        searchable
                        color="primary"
                        @input="input"
                        name="select-2"
                        v-model="model2"
                        :items="select2"
                style="height: 45px">
                </vc-select>
                <vc-list style="max-height: inherit !important;">
                    <vc-list-item v-for="i in 9" :key="i" :avatar="`https://placekitten.com/g/30/30`" icon="account_circle" @click="selectFromList(i)">
                        <vc-list-item-primary-text>User {{ i }}</vc-list-item-primary-text>
                        <vc-list-item-secondary-text>Admin</vc-list-item-secondary-text>
                    </vc-list-item>
                </vc-list>
            </vc-col>
            <vc-col :span="19" :spacing="spacing" style="max-height: inherit !important;">
        <div :style="{width: 300}" :class="['elevation-5']" style="max-height: 650px !important;">
            <vc-toolbar narrow>
                <vc-toolbar-title>Chat with random user</vc-toolbar-title>
                <vc-toolbar-controls-right>
                    <vc-button color="primary" icon-button>
                        <vc-icon>account_circle</vc-icon>
                    </vc-button>
                </vc-toolbar-controls-right>
            </vc-toolbar>
            <vc-chat
                    @update="autoRespond($event)"
                    :height="'300'"
                    :width="'300'"
                    :transcript="transcript"
                    style="max-height: 500px !important;"               />
            <form @submit.prevent="submit" :class="['pa-16']">
                <vc-text
                        autofocus
                        placeholder="Type something and hit enter"
                        color="primary"
                        icon-left="chat"
                        type="text"
                        v-model="chat"
                        name=this.name />
            </form>
        </div>
            </vc-col>
        </vc-layout>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Vuecidity from 'vuecidity'
    import '../../node_modules/vuecidity/dist/lib/vuecidity.min.css'

    Vue.use(Vuecidity)
    export default {
        data(){
            return{
                model2: '',
                chat:'',
                name:'Martin',
                transcript:{
                    "items": [
                        {
                            "name": "John",
                            "timestamp": 1519308015,
                            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit :)",
                            "avatar": "https://placekitten.com/g/30/30",
                            "color": "yellow"
                        },
                        {
                            "name": "Martin",
                            "timestamp": 1519308035,
                            "body": "Dolor sit...",
                            "avatar": "https://placekitten.com/g/30/30",
                            "me": true,
                            "color": "primary"
                        },
                        {
                            "name": "Martin",
                            "timestamp": 1519308065,
                            "body": "Blah... Placeat facere possimus!",
                            "avatar": "https://placekitten.com/g/30/30",
                            "me": true,
                            "color": "primary"
                        },
                        {
                            "name": "John",
                            "timestamp": 1519309015,
                            "body": "Fugiat quo voluptas nulla pariatur :)))",
                            "avatar": "https://placekitten.com/g/30/30",
                            "color": "yellow"
                        }
                    ]
                },
                select2:
                [{
                    label: 'B.C. Rich',
                    value: 'bcrich'
                }, {
                label: 'Jackson',
                    value: 'jackson'
            }]

            }
        },
        methods: {
            submit: function () {
                let item={};
                item.name=this.name;
                item.timestamp=1519309075;
                item.body="Your type: " + this.chat;
                item.avatar="https://placekitten.com/g/30/30";
                item.color="primary"
                item.me= true;
                this.transcript.items.push(item);
            },
            selectFromList: function (key) {
                console.log(this.model2)
            }
        }
    }
</script>