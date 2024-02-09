export interface Location {
  locationName: string,
  locality: Locality,
  city: string,
  state: string,
  country: string
}

export interface Locality {
type: string,
coordinates: number[]
}
