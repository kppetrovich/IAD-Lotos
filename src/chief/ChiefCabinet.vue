
<template>
    <div>
    <div>
        <b-contanier>
            <b-row>
        <b-col cols="3"><b-card

                style="max-width: 25rem;"
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
        <b-col cols="8"> <div>
                    <b-media right-align vertical-align="center">
                        <b-img slot="aside" blank blank-color="#ccc" width="80" alt="placeholder" />

                        <h5 class="mt-0 mb-1">Media object</h5>
                        <p class="mb-0">
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                            Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                            nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </p>
                    </b-media>
                </div>
            <div>
                <b-media right-align vertical-align="center">
                    <b-img slot="aside" blank blank-color="#ccc" width="80" alt="placeholder" />

                    <h5 class="mt-0 mb-1">Media object</h5>
                    <p class="mb-0">
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                        nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </p>
                </b-media>
            </div>
            <div>
                <b-media right-align vertical-align="center">
                    <b-img slot="aside" blank blank-color="#ccc" width="80" alt="placeholder" />

                    <h5 class="mt-0 mb-1">Media object</h5>
                    <p class="mb-0">
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                        nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </p>
                </b-media>
            </div>
            <div>
                <b-media right-align vertical-align="center">
                    <b-img slot="aside" blank blank-color="#ccc" width="80" alt="placeholder" />

                    <h5 class="mt-0 mb-1">Media object</h5>
                    <p class="mb-0">
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                        nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </p>
                </b-media>
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
    import AddParent from './AddParent'

    Vue.use(BootstrapVue)
    import BButtonToolbar from 'bootstrap-vue/es/components/button-toolbar/button-toolbar'
    Vue.component('b-button-toolbar', BButtonToolbar)
    export default {
        data () {
            return {
                user: {},
                users: []
            }
        },
        created () {

        },
        components: {
            AddParent : AddParent,
        }
    };
</script>