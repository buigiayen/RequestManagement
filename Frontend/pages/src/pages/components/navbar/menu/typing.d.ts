export namespace Menu {
  export interface path {
    d: string;
    fill?: string;
  }
  export interface Icon {
    width?: number;
    height?: number;
    path?: string | path[];
  }

  export interface Child {
    label?: string;
    icon?: Icon;
    link?: string;
  }

  export interface MenuItem {
    width?: number;
    height?: number;
    label?: string;
    icon?: Icon;
    description?: string;
    Children?: Child[];
    link?: string;
  }
}
