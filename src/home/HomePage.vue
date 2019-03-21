
<template>
    <div>
        <div>
        <nav_menu></nav_menu>
        </div>
            <div>
            <b-contanier>
                <b-row>
                    <b-col cols="3" style=""><b-card

                            style="max-width: 50rem;"
                            img-src="https://placekitten.com/380/200"
                            img-alt="Image"
                            img-top
                    >

                        <h4 slot="header">Big Chief</h4>

                        <b-card-body>
                            <b-card-title>Card Title</b-card-title>
                            <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
                            <b-card-text>
                                Some quick example text to build on the card title and make up the bulk of the card's
                                content.
                            </b-card-text>
                        </b-card-body>

                        <b-list-group flush>
                            <b-list-group-item>Cras justo odio</b-list-group-item>
                            <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
                            <b-list-group-item>Vestibulum at eros</b-list-group-item>
                        </b-list-group>

                        <b-card-body>
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </b-card-body>

                        <b-card-footer>This is a footer</b-card-footer>

                        <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                    </b-card></b-col>
                    <b-col cols="9">
                        <nav_menu @setmessages='setMessages' />
                        <div id="showMessages" v-show="this.IsSetMessages">
                            <Messages></Messages>
                        </div>
                        <nav_menu @addparent='setAddParent' />
                        <div id="showParent" v-show="this.IsSetAddParent">
                            <add-parent ></add-parent>
                        </div>

                    </b-col>
                </b-row>
            </b-contanier>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    import AddParent from '../chief/AddParent'
    import nav_menu from '../chief/page_components/nav-menu.vue'
    Vue.use(BootstrapVue)
    import BButtonToolbar from 'bootstrap-vue/es/components/button-toolbar/button-toolbar'
    import Messages from "../chief/Messages";
    Vue.component('b-button-toolbar', BButtonToolbar)
    export default {
        data () {
            return {
                IsSetAddParent: false,
                IsSetMessages: true,
                user: {},
                users: []
            }
        },
        created () {

        },
        components: {
            Messages,
            AddParent,
            nav_menu,
        },
        methods: {
            setAddParent () {
                console.log("here");
                this.IsSetMessages=false;
                this.IsSetAddParent=true;
            },
            setMessages(){
                this.IsSetAddParent=false;
                this.IsSetMessages=true;
            }
        }
    };
</script>