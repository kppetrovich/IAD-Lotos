<template>
    <div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>

        <b-card
                title="The first fighter"
                img-src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fuhnkle.files.wordpress.com%2F2012%2F09%2Fboxing2.jpg&f=1"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
                @click="setFirst"
        >
            <b-card-text>
                Intellect: {{this.intellect}}
                <br/>
                Power : {{this.power}}
                <br/>
                Agility: {{this.agility}}
            </b-card-text>
        </b-card>
                </b-col>
                <b-col>
        <b-card
                title="The second fighter"
                img-src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.dDyteuZI0Sm-Hf5hmGHxrQHaEl%26pid%3DApi&f=1"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem; max-height: 346px"
                class="mb-2"
                @click="setSecond"
        >
            <b-card-text>
                Intellect: {{this.intellect1}}
                <br/>
                Power : {{this.power1}}
                <br/>
                Agility: {{this.agility1}}
                <br/>
                <br/>
                <br/>
            </b-card-text>
        </b-card>
                </b-col>
            </b-row>
        </b-container>
        <div><h3>Selected fighter is: {{this.fighter}}</h3></div>
        <div><h3>Your current balance is: {{this.balance}}</h3></div>
        <b-form-group id="InputGroup" label-for="Input8">
            <b-form-input
                    id="Input8"
                    type="text"
                    v-model="funds"
                    required
                    size="lg"
                    placeholder="Enter sum to place" />
        </b-form-group>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                intellect:'',
                power:'',
                agility:'',
                intellect1:'',
                power1:'',
                agility1:'',
                balance: '',
                funds: '',
                fighter: ''
            }
        },
        methods:{
            setFirst(){
                this.figther='first';
            },
            setSecond(){
                this.figther='second';
            },
            reset(){
                this.funds='';
                this.figther='not selected'
            }

        }
    }
</script>

<style scoped>

</style>
