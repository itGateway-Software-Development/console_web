
  export type ServerData = {
    id: string|number;
    name: string;
    status: number;
    checked?: boolean
  }

  export type ServerPayload = {
    name: string;
    status: number|string
  }
  