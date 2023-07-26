export default async function handler(req, res) {
  const { streetAddress, city, state, zipCode } = req.body;

  const farmUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=7171+Morse+Rd+New+Albany+Ohio+43054&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const bpsUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=6850+Commerce+Court+Dr+Blacklick+Ohio+43004&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const coachUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=734+Old+Coach+Rd+Westerville+Ohio+43081&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const lynnfieldUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=789+Lynnfield+Drive+Westerville+Ohio+43081&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const druryUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=1994+Drury+Lane+Columbus+Ohio+43235&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const downtownUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=200+W+Nationwide+Blvd+Columbus+Ohio+43215&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const wadsworthUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=3596+South+Medina+Line+Road+Wadsworth+Ohio+44281&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const raysCircleUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=4835+Rays+Cir+Dublin+Ohio+43016&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const farmResponse = fetch(farmUrl);
  const bpsResponse = fetch(bpsUrl);
  const coachResponse = fetch(coachUrl);
  const lynnFieldResponse = fetch(lynnfieldUrl);
  const druryResponse = fetch(druryUrl);
  const downtownResponse = fetch(downtownUrl);
  const wadsworthResponse = fetch(wadsworthUrl);
  const raysCircleResponse = fetch(raysCircleUrl);

  const responses = await Promise.all([
    farmResponse,
    bpsResponse,
    coachResponse,
    lynnFieldResponse,
    druryResponse,
    downtownResponse,
    wadsworthResponse,
    raysCircleResponse,
  ]);

  const unwrappedResponses = await Promise.all(responses.map(response => response.json()));

  const result = unwrappedResponses.map((response, index) => {
    return {
      distance: response.routes[0].legs[0].distance.text,
      duration: response.routes[0].legs[0].duration.text,
      destination: response.routes[0].legs[0].end_address,
      origin: response.routes[0].legs[0].start_address,
    }
  });

  res.status(200).json(result);
}