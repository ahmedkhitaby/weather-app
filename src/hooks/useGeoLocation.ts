import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  return location;
};
