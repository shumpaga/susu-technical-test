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

  async getQuotation(rideID: number, info: { time: string, duration: string }): Promise<number> {
    const url = `${this.endpoint}/rides/${rideID}/quote`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({time: info.time, duration: parseInt(info.duration)})
    });
    const body = await response.json();
    return body;
  }
}
