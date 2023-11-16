import {Item} from "./Item";

export class CartLine {
  idCart!: number;
  idItem!: number;
  quantity!: number;
  isPackageSent!: boolean;
  createdDate!: string;
  item!: Item;
}
