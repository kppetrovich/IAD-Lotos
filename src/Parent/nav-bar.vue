<template>
<div>
    <head>
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" />
    </head>
    <b-navbar fixed="top" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">
            <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="BV" />
            Lotos
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="#"></b-nav-item>
                <div>
                    <b-button class="my-2 my-sm-0" @click.prevent="loadSearch">Search</b-button>
                    <b-button class="my-2 my-sm-0" @click.prevent="loadMessages">Messages</b-button>
                    <b-button class="my-2 my-sm-0" @click.prevent="loadGame">Watch fights</b-button>
                    <b-button class="my-2 my-sm-0" @click.prevent="loadBets">Bets</b-button>
                </div>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-dropdown id="ddown-dropright"  text="User"  class="m-1">
                    <b-dropdown-item href="#"><router-link to="/ParentCabinet">Profile</router-link></b-dropdown-item>
                    <b-dropdown-item  href="#"><router-link to="/login">Logout</router-link></b-dropdown-item>
                </b-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    import { EventBus } from '../_services/event-bus.js';
    Vue.use(BootstrapVue)
    import BButtonToolbar from 'bootstrap-vue/es/components/button-toolbar/button-toolbar'
    Vue.component('b-button-toolbar', BButtonToolbar)
    export default {
        data () {
            return {
            }
        },
        methods: {
            loadMessages: function () {
                EventBus.$emit('load', 'Messages');
            },
            loadSearch: function () {
                EventBus.$emit('load', 'Search')
            },
            loadGame: function () {
                EventBus.$emit('load', 'Game')
            },
            loadBets: function () {
                EventBus.$emit('load', 'Bets')
            }
        }

    };
</script>

