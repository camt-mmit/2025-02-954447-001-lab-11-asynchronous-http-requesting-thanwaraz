export interface ResourceItem {
  readonly created: string;
  readonly edited: string;
  readonly url: string;
}

export interface ResultsList<T> {
  readonly count: number;
  readonly previous: string | null;
  readonly next: string | null;
  readonly results: readonly T[];
}

export interface ResultsListParams {
  readonly search?: string;
  readonly page?: string;
}

export interface Person extends ResourceItem {
  readonly name: string;
  readonly birth_year: string;
  readonly eye_color: string;
  readonly gender: string;
  readonly hair_color: string;
  readonly height: string;
  readonly mass: string;
  readonly skin_color: string;
  readonly homeworld: string | null;
  readonly films: readonly string[];
  readonly species: readonly string[];
  readonly starships: readonly string[];
  readonly vehicles: readonly string[];
}

export interface Film extends ResourceItem {
  readonly title: string;
  readonly episode_id: number;
  readonly opening_crawl: string;
  readonly director: string;
  readonly producer: string;
  readonly release_date: string;
  readonly species: readonly string[];
  readonly starships: readonly string[];
  readonly vehicles: readonly string[];
  readonly characters: readonly string[];
  readonly planets: readonly string[];
}

export interface Planet extends ResourceItem {
  readonly name: string;
  readonly diameter: string;
  readonly rotation_period: string;
  readonly orbital_period: string;
  readonly gravity: string;
  readonly population: string;
  readonly climate: string;
  readonly terrain: string;
  readonly surface_water: string;
  readonly residents: readonly string[];
  readonly films: readonly string[];
}
