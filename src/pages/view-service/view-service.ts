import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/observable';
import { NgZone } from '@angular/core';
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

  map: any;
  circle: any;
  public handys: any;
  public kmrange: any;
  public curLat:any;
  public curLng:any;

  public vndLat: number[] = [];  
  public vndLng:number[] = []; 

  public distance: number[] = [];
  public vndAddress: string[] = [];

  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/vendor');

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private zone: NgZone) {
    
  }

  setAddressArray(callback){
    for(var i = 0; i < this.handys.length; i++){
      var add = this.handys[i]['addressLine1'] + " " + this.handys[i]['addressLine2'] + " " + this.handys[i]['addressLine3'] + " " + this.handys[i]['postal_code'] + " " + this.handys[i]['city'] + " " + this.handys[i]['state'];
      this.vndAddress.push(add);
      //this.codeAddress(add);
    }
    console.log("Set Address Array done");
    console.log(this.vndAddress);
    callback();
  }
  
  addToCoords(){
    for(var i = 0; i < this.vndAddress.length; i++){

    }
  }

  geocoder = new google.maps.Geocoder();
  
  codeAddress(add,callback) {
    //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    for(var i = 0; i < add.length; i++){
      var address = add[i];
      var tempLat;
      var tempLng;
      this.geocoder.geocode( { 'address' : address }, (results, status) => {
          if( status == google.maps.GeocoderStatus.OK ) {
            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            debugger;
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            this.vndLat.push(lat);
            this.vndLng.push(lng);
            let marker = new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: results[0].geometry.location
            });
          } else {
              alert( 'Geocode was not successful for the following reason: ' + status);
          }
      });
    }
    callback();
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  } 

  setDistance(){
    var i;
    var self = this;
    console.log(this.vndLat.length);
    for(i= 0; i < this.vndLat.length; i++){
      var d = this.getDistanceFromLatLonInKm(this.curLat, this.curLng, this.vndLat[i], this.vndLng[i]);
      this.distance.push(d);
      console.log(d);
    }
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewServicePage');
    this.valueRef.on('value', handy => {
      this.handys = handy.val();
      this.setAddressArray(() => {
        this.codeAddress(this.vndAddress, () => {
          this.setDistance();
        });
      });
    });
    this.loadMap();
    console.log(this.distance);
  }
  
  //listening to ion-range changes and update the radius of google map
  onModelChange($event){
    var radius = $event;
    console.log(radius);
    this.circle.setRadius(radius);
  }
  
  loadMap(){
    //geolocation options 
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };
    this.geolocation.getCurrentPosition().then((resp) => {
      this.curLat=resp.coords.latitude;
      this.curLng=resp.coords.longitude;
      //this.getDistanceFromLatLonInKm(resp.coords.latitude,resp.coords.longitude,resp.coords.latitude,resp.coords.longitude);
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
      for (var i = 0; i < this.vndLat.length; i++){  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.vndLat[i], this.vndLng[i]),
          map: this.map
        });
      }
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
