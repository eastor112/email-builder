export interface IAttributes {
  [key: string]: string;
}

export interface IElement {
  tagName: string;
  attributes?: IAttributes;
  children?: IElement[];
  content?: string;
}
