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
        <div :style="{width: 300}" :class="['elevation-5']">
            <vc-toolbar narrow>
                <vc-toolbar-icon-left icon="menu" />
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
                    :transcript="transcript" />
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
                chat:'',
                name:'Jonh',
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
                }

            }
        },
        methods: {
            submit: function () {
                let item={};
                item.name=this.name;
                item.timestamp=1519309075;
                item.body="Your type: " + this.chat;
                item.avatar="https://placekitten.com/g/30/30";
                item.color="yellow";
                this.transcript.items.push(item);
            }
        }
    }
</script>