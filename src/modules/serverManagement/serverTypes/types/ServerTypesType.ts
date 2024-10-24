
  export type ServerTypeData = {
    id: string|number;
    name: string;
    status: number;
    checked?: boolean
  }

  export type ServerTypePayload = {
    name: string;
    status: number|string
  }
  