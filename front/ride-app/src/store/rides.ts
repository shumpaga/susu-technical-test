import { ActionContext, Module } from "vuex";
import { RideService, InternalError } from "@/services/ride";
import { Ride } from "@/models/Ride.model";
import { RootState } from ".";

export class State {
  public rides: Ride[] = []
}

type Context = ActionContext<State, RootState>;

const mutations =  {
  setRides(state: State, payload: Ride[]): void {
    state.rides = payload;
  }
}

const getters = {
  getRideById: (state: State) => (id: number): Ride | undefined => {
    return state.rides.find(ride => ride.id === id)
  },

  availableRides(state: State): Ride[] {
    return state.rides.filter(r => r.available)
  }
}

const actions = {
  async fetchAllRides(context: Context): Promise<void> {
    const client = new RideService(process.env.VUE_APP_API_URL);
    let response;
    try {
      response = await client.getAllRides()
    }
    catch (err) {
      if (err instanceof InternalError) {
        return; // TODO : proper error handling
      } else {
        console.log(err);
        return;
      }
    }
    context.commit('setRides', response)
  }
}

export const module: Module<State, RootState> = {
    namespaced: true,
    state: new State(),
    actions,
    mutations,
    getters
  };
