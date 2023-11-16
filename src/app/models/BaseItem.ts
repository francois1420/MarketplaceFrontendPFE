import { Item } from "./Item";

export class BaseItem {
  idBaseItem!: number;
  name!: string;
  description!: string;
  idCategory!: number;
  createdDate!: string;
  items: Item[] = [];
}
