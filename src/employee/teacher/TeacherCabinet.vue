
<template>
    <div>

        <div>
            <nav_bar></nav_bar>
        </div>
        <div>
            <b-contanier>
                <b-row align-h="center">
                    <b-col cols="3" style="" ><b-card

                            style="max-width: 50rem;"
                            img-src="https://placekitten.com/380/200"
                            img-alt="Image"
                            img-top
                    >

                        <h4 slot="header">Teacher</h4>

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
                    <b-col cols="9" style="position: inherit !important;">
                        <component :is="currentView"></component>

                    </b-col>
                </b-row>
            </b-contanier>
        </div>
    </div>
</template>

<script>
    import Search from '../../_services/Search.vue';
    import { EventBus } from '../../_services/event-bus.js';
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    import nav_bar from '../educator/nav-bar.vue'
    import BContainer from 'bootstrap-vue/es/components/layout/container'
    import GradeBook from '../teacher/GradeBook.vue'
    Vue.component('b-container', BContainer)
    Vue.use(BootstrapVue);
    import BButtonToolbar from 'bootstrap-vue/es/components/button-toolbar/button-toolbar'
    import Messages from "../../_services/Messages";
    Vue.component('b-button-toolbar', BButtonToolbar);
    export default {
        data () {
            return {
                IsSetAddParent: false,
                IsSetMessages: true,
                user: {},
                users: [],
                currentView: 'Messages'
            }
        },
        created () {
            EventBus.$on('load', this.loadView)
        },
        components: {
            Messages,
            nav_bar,
            Search,
            GradeBook
        },
        methods: {
            loadView(selected) {
                this.currentView = selected;
            },
        }
    };
</script>