import Vue from 'vue'
import Vuex from 'vuex'
import {module as rides, State as RideState } from './rides'

Vue.use(Vuex)

export interface RootState {
  rides: RideState
}

export default new Vuex.Store({
  modules: {
    rides
  }
})
