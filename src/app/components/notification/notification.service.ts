import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }

  async notification(position: 'top' | 'middle' | 'bottom', text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: position
    });
    await toast.present();
  }
}
