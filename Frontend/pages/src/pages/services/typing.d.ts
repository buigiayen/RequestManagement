declare namespace Services {
  export interface Service {
    id: string;
    slug: string;
    label: string;
    description?: string;
    price: number;
  }
}
