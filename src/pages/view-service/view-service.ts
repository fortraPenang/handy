import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/observable';
import firebase from 'firebase';

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

  obj: { Address: string, Category: string};
  map: any;
  circle: any;
  public handys: any;
  public kmrange: any;
  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/');
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewServicePage');
    this.loadMap();
    this.valueRef.on('value', handy => {
      //this.handys = handy.val();
      //console.log(handy.val()[0]['Address']);
      console.log(handy);
      this.handys = handy.val();
    });  
  }
  
  //listening to ion-range changes and update the radius of google map
  onModelChange($event){
    var radius = $event;
    console.log(radius);
    this.circle.setRadius(radius);
  }

  //load the map
  loadMap(){
    //geolocation options 
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 18
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      this.circle = new google.maps.Circle({
        map: this.map,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        center: latLng,
        radius: 100
      });
    }).catch((error) => {
      console.log('Please turn on your GPS or move to an open space', error);
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
