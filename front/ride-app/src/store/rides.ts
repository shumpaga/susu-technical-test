import { ActionContext, Module } from "vuex";
import { RideService, InternalError } from "@/services/ride";
import { Ride } from "@/models/Ride.model";
import { RootState } from ".";

export class State {
  public rides: Ride[] = []
  public selectedRide: number | null = null
  public suggestedPrice: string | null = null
}

type Context = ActionContext<State, RootState>;

const mutations =  {
  setRides(state: State, payload: Ride[]): void {
    state.rides = payload;
  },

  selectRide(state: State, payload: { rideId: number }): void {
    state.selectedRide = payload.rideId;
  },

  setSuggestedPrice(state: State, payload: { price: number }): void {
    state.suggestedPrice = payload.price.toFixed(2);
  },

  resetSelection(state: State): void {
    state.suggestedPrice = null;
    state.selectedRide = null;
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
  },

  async initReservation(context: Context, payload: { rideId: number }): Promise<void> {
    context.commit('selectRide', payload)
  },

  async getQuotation(context: Context, payload: { time: string, duration: string }): Promise<void> {
    if (!context.state.selectedRide) {
      return;
    }
    const client = new RideService(process.env.VUE_APP_API_URL);
    const response = await client.getQuotation(
      context.state.selectedRide,
      payload,
    );
    context.commit('setSuggestedPrice', response)
  },

  resetSelection(context: Context): void {
    context.commit('resetSelection')
  }
}

export const module: Module<State, RootState> = {
    namespaced: true,
    state: new State(),
    actions,
    mutations,
    getters
  };
