export default async function handler(req, res) {
  const { streetAddress, city, state, zipCode } = req.body;

  const url = `https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=3596+South+Medina+Line+Road+Wadsworth+Ohio+44281&key=AIzaSyBYhfwE4TJKvDSrcFfdSXqMUpzz8v2Y4k8`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}