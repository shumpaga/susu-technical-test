<template>
  <div>
    <section class="title">
      <img alt="Ride app logo" src="@/assets/taxi.png">
      <h1 class="title">{{ availableRides.length }} rides available for your convenience</h1>
    </section>
    <section class="cards">
      <RideCard class='card' v-for="ride in rides" :ride="ride" :key="ride.id"/>
    </section>
    <modal v-if="selectedRide"></modal>
  </div>
</template>
<style scoped>
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  h1 {
    margin: 20px;
    color:hotpink;
  }
</style>

<script lang="ts">
import { mapActions, mapGetters, mapState } from "vuex"
import { Vue } from "vue-property-decorator";
import RideCard from "@/components/RideCard.vue";
import Modal from "@/components/Modal.vue";

export default Vue.extend({
  components: {
    RideCard,
    Modal,
  },
  computed: {
    ...mapState("rides", ["rides", "selectedRide"]),
    ...mapGetters("rides", ["availableRides"])
  },
  methods: {
    ...mapActions("rides", ["fetchAllRides"])
  },
  created(): void {
    this.fetchAllRides();
  }

})
</script>
