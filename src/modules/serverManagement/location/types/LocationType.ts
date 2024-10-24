
  export type LocationType = {
    id: string|number;
    name: string;
    image: string;
    status: number;
    checked?: boolean
  }

  export type LocationPayload = {
    name: string;
    image: Object,
    status: number|string
  }
  