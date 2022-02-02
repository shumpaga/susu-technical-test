<template>
    <div class="card" :class="{disabled: !ride.available}">
        <font-awesome-icon :icon="iconType" size="2x"/>
        <p class="name">{{ ride.id }}</p>
        <p v-if="ride.available">
            <button @click="initReservation({rideId: ride.id})">Reserve</button>
        </p>
    </div>
</template>
<style scoped>
    .card {
        width: 100px;
        min-width: 100px;
        background-color:lightpink;
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
    }
    .disabled {
        color: #555;
        background-color: #888;
    }
</style>
<script lang="ts">
import { Vue} from "vue-property-decorator";
import { faTaxi, faRocket, faShuttleVan, faQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Ride } from "@/models/Ride.model";
import { PropType } from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
    props: {
        ride: Object as PropType<Ride>,
    },
    computed: {
        iconType(): IconDefinition {
            switch (this.ride.type) {
                case 'premium': return faRocket;
                case 'standard': return faTaxi;
                case 'eco': return faShuttleVan;
                default: return faQuestion;
            }
        }
    },
    methods: {
        ...mapActions("rides", ["initReservation"])
    }
});
</script>
