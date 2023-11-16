import {CartLine} from './CartLine'

export class Cart {
  idCart!: number;
  idUser!: number;
  isBought!: boolean;
  boughtDate: string = "";
  createdDate!: string;
  cartLines: CartLine[] = [];
}
