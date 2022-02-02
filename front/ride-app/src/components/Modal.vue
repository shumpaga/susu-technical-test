<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="resetSelection">&times;</span>
            <section>
                <p>
                    <label for="time">Time</label>
                    <input type="time" id="time" v-model="time" @change="computePrice" />
                </p>
                <p>
                    <label for="duration">Duration</label>
                    <input
                        type="number"
                        id="duration"
                        v-model="duration"
                        placeholder="in minutes"
                        @change="computePrice"
                        />
                </p>
                <p>
                    Approximate cost:
                    <span v-if="suggestedPrice"> {{ suggestedPrice }} €</span>
                    <span v-else>Please enter an approximate departure time and duration</span>
                </p>
                <!-- TODO: button to confirm reservation -->
            </section>
        </div>
    </div>
</template>
<style scoped>
.modal {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    width: 60%;
    z-index: 2;
    padding: 20px;
}

label {
    display: inline-block;
    width: 140px;
    text-align: right;
    padding-right: 15px;
}
input {
    width: 140px;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
    data() {
        return {
            time: new Date().toTimeString().substring(0, 5),
            duration: "0",
        }
    },
    computed: {
        ...mapState('rides', ['suggestedPrice'])
    },
    methods: {
        ...mapActions('rides', ["getQuotation", "resetSelection"]),
        computePrice() {
            this.getQuotation({time: this.time, duration: this.duration})
        }
    }
})
</script>
