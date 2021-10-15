const toRad = value => (value * Math.PI) / 180;
const robustAcos = value => {
  if (value > 1) {
    return 1;
  }
  if (value < -1) {
    return -1;
  }

  return value;
};
const earthRadius = 6378137;

class Distance {
  static getDistance(fromLat, fromLng, toLat, toLng) {
    const distance =
      ((Math.acos(
        robustAcos(
          Math.sin(toRad(toLat)) * Math.sin(toRad(fromLat)) +
            Math.cos(toRad(toLat)) *
              Math.cos(toRad(fromLat)) *
              Math.cos(toRad(fromLng) - toRad(toLng)),
        ),
      ) *
        earthRadius) /
        1000) *
      0.621371;
    return Math.round(distance);
  }
}

export { Distance };
