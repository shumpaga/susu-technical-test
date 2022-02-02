import { Ride } from '@/models/Ride.model'

export class APIError extends Error {
  public name = "APIError";
}

export class InternalError extends APIError {
  public name = "InternalError";
}

export class NotFound extends APIError {
  public name = "NotFound";
}

export class RideService {
  constructor(
    protected readonly endpoint: string,
  ) {
    this.endpoint = endpoint
  }

  async getAllRides(): Promise<Ride[]> {
    const response = await fetch(`${this.endpoint}/rides`)
    if (!response.ok) {
      console.error(`Error while querying ${this.endpoint}/rides`);
      console.error(response);
      throw new InternalError();
    }
    const body = await response.json();
    return body;
  }
  
  async getRide(rideID: string): Promise<Ride> {
    const response = await fetch(`${this.endpoint}/rides/${rideID}`)
    if (response.status === 404) {
      throw new NotFound()
    } else if (!response.ok) {
      console.error(`Error while querying ${this.endpoint}/rides`);
      console.error(response);
      throw new InternalError();
    }
    const body = await response.json();
    return body;
  }

}