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
                            <b-dropdown-item href="#" @click="AddParent">Parent</b-dropdown-item>
                            <b-dropdown-item href="#">Child</b-dropdown-item>
                            <b-dropdown-item href="#">Item</b-dropdown-item>
                            <b-dropdown-item href="#">Employee</b-dropdown-item>
                        </b-dropdown>
                        <b-dropdown id="ddown-dropright"  text="Edit"  class="m-1">
                            <b-dropdown-item href="#">Parent</b-dropdown-item>
                            <b-dropdown-item href="#">Child</b-dropdown-item>
                            <b-dropdown-item href="#">Item</b-dropdown-item>
                            <b-dropdown-item href="#">Employee</b-dropdown-item>
                        </b-dropdown>
                        <b-button class="my-2 my-sm-0" @click="setMessages">Messages</b-button>
                    </div>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>
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
    Vue.use(BootstrapVue)
    import BButtonToolbar from 'bootstrap-vue/es/components/button-toolbar/button-toolbar'
    Vue.component('b-button-toolbar', BButtonToolbar)
    export default {
        data () {
            return {
            }
        },
        methods: {
            setMessages: function () {
                this.$emit('setmessages');
            },
            AddParent: function () {
                this.$emit('addparent');

            },
        }

    };
</script>

<style scoped>

</style>