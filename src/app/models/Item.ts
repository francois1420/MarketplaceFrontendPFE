import {BaseItem} from "./BaseItem";
import {ItemImage} from "./ItemImage";

export class Item {
  idBaseItem!: number;
  idItem!: number;
  size!: string;
  color!: string;
  stock!: number;
  price!: number;
  createdDate!: string;
  itemImages: ItemImage[] = [];
  baseItem!: BaseItem;
}
