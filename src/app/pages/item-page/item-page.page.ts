import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseItem } from '../../models/BaseItem';
import {Location} from '@angular/common';
import { ToastController } from '@ionic/angular';
import { Item } from 'src/app/models/Item';
import { Cart } from 'src/app/models/Cart';
import { CartLine } from 'src/app/models/CartLine';
import { BaseItemService } from 'src/app/services/base-item-service/base-item.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { UserService } from 'src/app/services/user-service/user.service';
import {NotificationService} from "../../components/notification/notification.service";


@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.page.html',
  styleUrls: ['./item-page.page.scss'],
})
export class ItemPagePage implements OnInit {

  base_item = {} as BaseItem;
  selected_item = {} as Item;
  cart = {} as Cart

  options_color : Map<string,Set<string>> = new Map();
  options_size : Map<string, Set<string>> = new Map();

  colors_keys : Set<string> = new Set();
  sizes_keys : Set<string>= new Set();

  not_available : boolean = false;

  items_available: Item[] = [];
  similar_items : BaseItem[]= [];
  selected_size : string = "";
  selected_color : string = "";
  price : string = "";

  constructor(private serviceBaseItem : BaseItemService,
      private serviceCart : CartService,
      private route : ActivatedRoute,
      private location: Location,
      private notification: NotificationService,
      public userService: UserService) {}

  ngOnInit() {
    this.getItem();
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.serviceBaseItem.getBaseItem(id).subscribe(
      baseItem => {
        this.base_item = baseItem;
        this.selected_item = baseItem.items[0];
        this.items_available = baseItem.items;
        this.initMapColor(baseItem.items);
        this.initMapSize(baseItem.items);
        this.getItemsSimilar();
      }
    );
  }

  onChangeColor(ev: any){
    this.selected_color = ev.target.value;
    this.price ="";
    if(this.selected_size !=""){
      if(this.check_item()){
        this.selectPrize();
      }
    }
  }

  onChangeSize(ev: any){
    this.selected_size = ev.target.value;
    this.price ="";
    if(this.selected_color!=""){
      if(this.check_item()){
        this.selectPrize();
      }
    }
  }

  initMapColor(items : Item[]){
    items.forEach(e=>{
      if(!this.options_color.has(e.color)){
        let sizes : Set<string> = new Set();
        sizes.add(e.size);
        this.options_color.set(e.color, sizes);
        this.colors_keys.add(e.color);
      }
      else if(this.options_color.has(e.color)){
        this.options_color.set(e.color, this.options_color.get(e.color)!.add(e.size));
      }
    });
  }

  initMapSize(items : Item[]){
    items.forEach(e=>{
      if(!this.options_size.has(e.size)){
        let colors : Set<string> = new Set();
        colors.add(e.color);
        this.options_size.set(e.size, colors);
        this.sizes_keys.add(e.size);
      }
      else if(this.options_size.has(e.size)){
        this.options_size.set(e.size, this.options_size.get(e.size)!.add(e.color));
      }
    });
  }

  selectPrize(){
    this.items_available.forEach(e => {
      if(this.selected_size==e.size && this.selected_color==e.color){
        this.price = e.price.toString();
        this.selected_item = e;
      }
    })
    this.check_availability();
  }

  check_availability(){
    if(this.selected_item.stock==0){
      this.not_available = true;
    }
    else{
      this.not_available = false;
    }
  }

  check_item() : Boolean{
    if(!this.options_color.get(this.selected_color)!.has(this.selected_size)) {
      this.not_available = true;
      return false;
    }
    this.not_available = false;
    return true;
  }

  getItemsSimilar(): void {
    this.serviceBaseItem.getSimilarItems(this.base_item.idCategory).subscribe(
      items => {
        let res = items;
        res.forEach(e=>{
          if((e.idBaseItem!=this.base_item.idBaseItem)&&(e.items.length>0)){
            this.similar_items.push(e);
          }
        })
      }
    )
  }

  async addToCart() {

    if(this.userService.isConnected()){
      if((this.selected_size === "" || this.selected_size == undefined) || (this.selected_color === "" || this.selected_color == undefined)){
        this.notification.notification('top', 'Choisissez une couleur et une taille !');
      } else{
        this.notification.notification('top', 'Produit ajouté dans le panier !');
        this.cart = await this.serviceCart.cart;
        this.updateOneItem(this.cart.cartLines.find(e=>e.idItem==this.selected_item.idItem)!, this.cart);
      }
    }
    else{
      this.notification.notification('top', 'Veuillez vous connecter à votre compte !');
    }
  }

  updateOneItem(cartLine: CartLine, cart : Cart){
    if(cartLine!=undefined){
      let quantity = cartLine.quantity +=1;
      this.serviceCart.updateItem(this.selected_item.idItem, quantity);
    }
    else {
      this.addOneItem(cart);
    }
  }

  addOneItem(cart : Cart) : void {
      this.serviceCart.addItem(this.selected_item.idItem);
  }

  goBack() : void {
    this.location.back();
  }

}
