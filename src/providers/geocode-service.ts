import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/observable';
import firebase from 'firebase';
import { SearchCategoryPage } from '../search-category/search-category';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


/*
  Generated class for the GeocodeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeocodeServiceProvider {

  constructor(public http: Http,
              private geolocation: Geolocation,
              public loadingCtrl: LoadingController,
              public menuCtrl: MenuController) {
    console.log('Hello GeocodeServiceProvider Provider');
  }

  //Converts valid address to coordinates
  geocode(address: any){

  }
  

}
