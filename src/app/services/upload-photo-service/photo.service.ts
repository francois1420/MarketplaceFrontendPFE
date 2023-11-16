import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
import uploadcare from '@prezly/uploadcare-widget';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photosURL: string[] = [];

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });

    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

      // Read each saved photo's data from the Filesystem
      const readFile = await Filesystem.readFile({
        path: savedImageFile.filepath,
        directory: Directory.Data,
      });

      // Web platform only: Load the photo as base64 data
      savedImageFile.webviewPath = `data:image/jpeg;base64,${readFile.data}`;

      let base64String = savedImageFile.webviewPath;
      let base64Image = base64String.split(';base64,').pop();

      const imageName = 'name.png'; // fictive name
      const imageBlob = await this.dataURItoBlob(base64Image!);
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });

      // convert a base64 image to a File object
      const fileToUpload = imageFile;
      //dataURLtoFile(b64data, "image");

      // upload the file to Uploadcare
      let upload = uploadcare.fileFrom("object", fileToUpload);

      Preferences.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos),
      })

      await upload.done((fileInfo: { cdnUrl: any; }) => {
        this.photosURL.push(fileInfo.cdnUrl);
      });
      return true;
  }


  async dataURItoBlob(dataURI: string) {
    const byteString = await window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
 }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
