<template>
    <div>
        <div>
            <b-form-select v-model="selected" :options="options"></b-form-select>
        </div>
 <div v-if="selected=='first'">
    <div style=" width: inherit">
        <b-embed
                type="iframe"
                aspect="16by9"
                src="http://dl2.n3.20.cdn.perfectgirls.net/mp4/N5O0zBlW9KlhdnE6-upjPg==,1553982532/600/926/600926-hd.mp4"
                allowfullscreen
        ></b-embed>
    </div>
 </div>
        <div v-if="selected=='second'">
            <div style=" width: inherit">
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="http://dl1.n3.18.cdn.perfectgirls.net/mp4/reidqxUYUIUSsLzXbrJCrQ==,1553984091/599/979/599979-hd.mp4"
                        allowfullscreen
                ></b-embed>
            </div>
        </div>
        <div v-if="selected=='third'">
            <div style=" width: inherit">
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="http://dl1.n3.18.cdn.perfectgirls.net/mp4/reidqxUYUIUSsLzXbrJCrQ==,1553984091/599/979/599979-hd.mp4"
                        allowfullscreen
                ></b-embed>
            </div>
        </div>
        <div v-if="selected=='fourth'">
            <div style=" width: inherit">
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="http://dl2.n3.20.cdn.perfectgirls.net/mp4/N5O0zBlW9KlhdnE6-upjPg==,1553982532/600/926/600926-hd.mp4"
                        allowfullscreen
                ></b-embed>
            </div>
        </div>
        <div v-if="selected=='all'">
            <div>
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="http://dl2.n3.20.cdn.perfectgirls.net/mp4/N5O0zBlW9KlhdnE6-upjPg==,1553982532/600/926/600926-hd.mp4"
                        allowfullscreen
                ></b-embed>
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="http://dl2.n3.20.cdn.perfectgirls.net/mp4/N5O0zBlW9KlhdnE6-upjPg==,1553982532/600/926/600926-hd.mp4"
                        allowfullscreen
                ></b-embed>
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="http://dl1.n3.18.cdn.perfectgirls.net/mp4/reidqxUYUIUSsLzXbrJCrQ==,1553984091/599/979/599979-hd.mp4"
                        allowfullscreen
                ></b-embed>
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="http://dl1.n3.18.cdn.perfectgirls.net/mp4/reidqxUYUIUSsLzXbrJCrQ==,1553984091/599/979/599979-hd.mp4"
                        allowfullscreen
                ></b-embed> <b-embed
                    type="iframe"
                    aspect="16by9"
                    src="http://dl1.n3.18.cdn.perfectgirls.net/mp4/reidqxUYUIUSsLzXbrJCrQ==,1553984091/599/979/599979-hd.mp4"
                    allowfullscreen
            ></b-embed>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Cameras",
        data() {
            return {
                selected: null,
                options: [
                    { value: null, text: 'Please select an option' },
                    { value: 'first', text: 'Camera 1' },
                    { value: 'second', text: 'Camera 2' },
                    { value: 'third', text: 'Camera 3' },
                    { value: 'fourth', text: 'Camera 4' },
                    {value: 'all', text: 'All cameras'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>