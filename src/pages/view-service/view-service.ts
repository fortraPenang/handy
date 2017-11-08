import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";


declare var google;

/**
 * Generated class for the ViewServicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-service',
  templateUrl: 'view-service.html',
})
export class ViewServicePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  handys: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, angFire: AngularFireDatabase) {
    this.handys = angFire.list('/Handys');
    console.log(this.handys['/Handys']);
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewServicePage');
    this.loadMap();
  }

  loadMap(){
  this.geolocation.getCurrentPosition().then((resp) =>{
    console.log(resp.coords.latitude)
    console.log(resp.coords.longitude)
    let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

  

    let mapOptions = {
      /*camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 8,
        tilt: 30
      }*/
      center: latLng,
      zoom: 18
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    }).catch((error)=>{
        console.log('Error getting location',error);
      });

      
  }
  addMarker(){
    
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
     });
    
     let content = "<h4>Information!</h4>";         
    
     //this.addInfoWindow(marker, content);
    
   }
}
