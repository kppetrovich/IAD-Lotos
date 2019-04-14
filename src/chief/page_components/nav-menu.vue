<template>
    <div>
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
                        <b-dropdown id="ddown-dropright" text="Add"  class="m-1">
                            <b-dropdown-item href="#" @click.prevent="loadAddParent">Parent</b-dropdown-item>
                            <b-dropdown-item href="#" @click.prevent="loadAddChild">Child</b-dropdown-item>
                            <b-dropdown-item href="#" @click.prevent="loadAddItem">Item</b-dropdown-item>
                            <b-dropdown-item href="#" @click.prevent="loadAddEmployee">Employee</b-dropdown-item>
                            <b-dropdown-item href="#" @click.prevent="loadAddGroup">Group</b-dropdown-item>
                            <b-dropdown-item href="#" @click.prevent="loadAddPlace">Place</b-dropdown-item>
                        </b-dropdown>
                        <b-button class="my-2 my-sm-0" @click.prevent="loadManageGroups">Manage Groups</b-button>
                        <b-button class="my-2 my-sm-0" @click.prevent="loadSearch">Search</b-button>
                        <b-button class="my-2 my-sm-0" @click.prevent="loadMessages">Messages</b-button>
                    </div>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-dropdown id="ddown-dropright"  text="User"  class="m-1">
                        <b-dropdown-item href="#"><router-link to="/ChiefCabinet">Profile</router-link></b-dropdown-item>
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
    import { EventBus } from '../../_services/event-bus.js';
    Vue.use(BootstrapVue)
    import BButtonToolbar from 'bootstrap-vue/es/components/button-toolbar/button-toolbar'
    import AddPlace from "../AddPlace";
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
            loadAddParent: function () {
                EventBus.$emit('load', 'AddParent')

            },
            loadAddChild: function () {
                EventBus.$emit('load', 'AddChild')
            },
            loadAddEmployee: function () {
                EventBus.$emit('load', 'AddEmployee')
            },
            loadAddItem: function () {
                EventBus.$emit('load', 'AddItem')
            },
            loadSearch: function () {
                EventBus.$emit('load', 'Search')
            },
            loadAddGroup: function () {
                EventBus.$emit('load', 'AddGroup')
            },
            loadAddPlace: function () {
                EventBus.$emit('load', 'AddPlace')
            },
            loadManageGroups: function () {
                EventBus.$emit('load', 'ManageGroups')
            }
        }

    };
</script>

<style scoped>

</style>