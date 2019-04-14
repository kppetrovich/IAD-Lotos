<template>
    <div>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected: null,
                options: [
                    { value: null, text: 'Please select some group' },
                    { value: 'Group 1', text: 'Group 1' },
                    { value: 'Group 2', text: 'Group 2' },
                    { value: 'Group 3', text: 'Group 3' },
                    { value: 'Group 4', text: 'Group 4'}
                ]
            }
        }
    }
</script>