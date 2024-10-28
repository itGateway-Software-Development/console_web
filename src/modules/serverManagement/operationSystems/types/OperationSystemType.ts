
  export type OperationSystemType = {
    id: string|number;
    name: string;
    version: Array<string|number>;
    image: string;
    server_types: Array<string|number>;
    status: number;
    checked?: boolean
  }

  export type OperationSystemPayload = {
    name: string;
    server_types: Array<string|number>;
    image: Object,
    versions?: Array<string|number>;
    status: number|string
  }
  