import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/observable';
import firebase from 'firebase';
import { SearchCategoryPage } from '../search-category/search-category';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';



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
  public radius:any;
  public handysKeys:any;

  public vndLat: number[] = [];  
  public vndLng:number[] = []; 

  public distance: number[] = [];
  public vndAddress: string[] = [];

  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/vendor');

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private geolocation: Geolocation,
              public loadingCtrl: LoadingController,
              public menuCtrl: MenuController) {
  }

  setAddressArray(callback){
    console.log("1. setAddressArray");
    var len = Object.keys(this.handys).length
    for(var i = 0; i < len; i++){
      var j = this.handysKeys[i];
      var add = this.handys[j]['cAddress1'] + " " + this.handys[j]['cAddress2'] + " " + this.handys[j]['postcode'] + " " + this.handys[j]['city'] + " " + this.handys[j]['state'];
      this.vndAddress.push(add);
      //this.codeAddress(add);
    }
    console.log(this.vndAddress);
    callback();
  }
  

  geocoder = new google.maps.Geocoder();
  
  codeAddress(add) {
    console.log("2. codeAddress");
    //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    for(var i = 0; i < add.length; i++){
      var address = add[i];
      var tempLat;
      var tempLng;
      this.geocoder.geocode( { 'address' : address }, (results, status) => {
          if( status == google.maps.GeocoderStatus.OK ) {
            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            tempLat = lat;
            tempLng = lng;
            console.log("3. setDistance");
            console.log(lat + " lat");
            console.log(lng + " lng");
              /* var d = this.getDistanceFromLatLonInKm(this.curLat, this.curLng, this.vndLat[i], this.vndLng[i]); */
              //var latLngA = new google.maps.LatLng(this.curLat,this.curLng);
              //var latLngB = new google.maps.LatLng(lat, lng);
              /* var d = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB); */
              var d = this.getDistanceFromLatLonInKm(lat, lng,this.curLat,this.curLng);
              this.distance.push(+(d.toFixed(2))); //two decimal places
              console.log(d);
            /* let marker = new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: results[0].geometry.location
            }); */
              let marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: this.map
              });
          } else {
              alert( 'Geocode was not successful for the following reason: ' + status);
          }
      });
      this.vndLat.push(tempLat);
      this.vndLng.push(tempLng);
      console.log(this.vndLat);
    }
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewServicePage');
    this.valueRef.on('value', handy => {
      this.handys = handy.val();
      this.handysKeys = Object.keys(this.handys);
      console.log(this.handys)
      this.loadMap(() => {
        this.setAddressArray(() => {
          this.codeAddress(this.vndAddress);
          console.log(this.curLat + " user lat");
          console.log(this.curLng + " user lng");
        });
      });
    });
  }
  
  //listening to ion-range changes and update the radius of google map
  onModelChange($event){
    this.radius = $event;
    console.log(this.radius);
    this.circle.setRadius(this.radius * 1000); //convert to meter
  }
  
  goToSearchCategory(idx){
    this.navCtrl.push(SearchCategoryPage,idx)
  }

  loadMap(callback){
    //geolocation options 
    console.log("0. loadMap");
    let options = {
      enableHighAccuracy: true,
      timeout: 10000,
    };
    //create loader
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    loader.present();
    //get current pos via gps
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.curLat = resp.coords.latitude;
      this.curLng = resp.coords.longitude;
      callback();

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      //listen to idle event, close loadingCtrl if map loaded
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        loader.dismiss();
        console.log("Map loaded");
      },
      (error) => {
        loader.dismiss();
        alert("Unable to load map. Error: " +  error);
      });
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
        console.log(this.vndLat[i]+" "+this.vndLng[i]);
      }
      this.circle = new google.maps.Circle({
        map: this.map,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        center: latLng,
        radius: 100 //in meters
      });
    }).catch((error) => {
      console.log('Please turn on your GPS or move to an open space', error);
    });
  }
   
 /*UNUSED FUNCTIONS  
  addMarker(){
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
     });
     let content = "<h4>Information!</h4>";         
     //this.addInfoWindow(marker, content);
    
   }
   setDistance(Lat,Lng){
    console.log("3. setDistance");
    console.log(this.vndLat.length);
      var d = this.getDistanceFromLatLonInKm(this.curLat, this.curLng, this.vndLat[i], this.vndLng[i]); 
      var latLngA = new google.maps.LatLng(this.curLat,this.curLng);
      var latLngB = new google.maps.LatLng(Lat, Lng);
      var d = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
      this.distance.push(d);
      console.log(this.distance);
  } 
 
   addToCoords(){
    for(var i = 0; i < this.vndAddress.length; i++){

    }
  }  */

}

