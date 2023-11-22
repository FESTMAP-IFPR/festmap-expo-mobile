import { KEY_MAP_BOX } from "./constants";

// create a function to get the address from the cep
export const findAddressSearch = async (search_text: string) => {
  const search_text_uri = encodeURI(search_text);

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text_uri}.json?access_token=${KEY_MAP_BOX}&country=BR`
  );
  console.log(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text_uri}.json?access_token=${KEY_MAP_BOX}&country=BR`
  );
  const address = await response.json();
  return address;
};
