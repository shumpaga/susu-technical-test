from dataclasses import dataclass
import enum
import json
from typing import List, Optional

from dataclasses_json import dataclass_json


class RideNotFound(Exception):
    pass


class RideType(str, enum.Enum):  # inherit from str to allow JSON serialization
    standard = "standard"
    eco = "eco"
    premium = "premium"


@dataclass_json
@dataclass
class Ride:
    id: int
    type: RideType
    available: bool


class RideService:

    _rides: Optional[List[Ride]] = None

    @classmethod
    def _load_rides(cls) -> None:
        with open("store/rides.json") as f:
            rides_as_dict = json.load(f)
        cls._rides = [Ride.from_dict(r) for r in rides_as_dict]

    @classmethod
    def get_all(cls) -> List[Ride]:
        if cls._rides is None:
            cls._load_rides()
        return cls._rides

    @classmethod
    def get(cls, id: int) -> Ride:
        if cls._rides is None:
            cls._load_rides()
        for ride in cls._rides:
            if ride.id == id:
                return ride
        raise RideNotFound(id)

    @classmethod
    def save(cls, ride: Ride) -> None:
        # dummy function to demonstrate where we would commit the changes
        # if we were using a real database
        pass
