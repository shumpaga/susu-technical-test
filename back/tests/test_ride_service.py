import pytest

from store.rides import RideService, Ride, RideNotFound


def test_get_all_rides() -> None:
    all_rides = RideService.get_all()
    assert isinstance(all_rides, list)
    assert isinstance(all_rides[0], Ride)


def test_get_ride() -> None:
    ride = RideService.get(0)
    assert ride.id == 0


def test_get_unknown_ride() -> None:
    with pytest.raises(RideNotFound):
        RideService.get(-1)
