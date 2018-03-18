import { Component,OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { GoogleMaps } from '../providers/google-maps';
import { FormsModule} from '@angular/forms';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import {AutocompletePage} from '../autocomplete/autocomplete';
import { Camera, CameraOptions } from '@ionic-native/camera';



/**
 * Generated class for the BookservicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookservice',
  templateUrl: 'bookservice.html',
  
  
})
export class BookservicePage  {

  valueRef = firebase.database().ref('/Handys/request');
  userRef = firebase.database().ref('/Handys/user');

  service:any;
  description:any;
  myDate:any;
  myTime:any;
  address:any;
  postCode:any;
  city:any;
  state:any;
  budget:any;
  vndId:any;
  currentUser:any;
  uId:any;
  newAddress:any;
  imageURI:any;

  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any; 

  public step:any
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public camera: Camera) {
    this.newAddress = {
      place: ''
    };

    this.step = "step1";
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = firebase.auth().currentUser;
        this.uId = this.currentUser.uid;
        this.request.userId = this.uId;
      }
    });
  }

  //TODO: convert push data direct assign to this object assign
  request: { serviceCategory: string, description: string, date: string, time: string,
    address: string, budget: string, status: string, vendorId: string, userId: string, img: string } = {

    serviceCategory:'',
    description: '',
    date:'',
    time: '',
    address:'',
    budget:'',
    status:"pending",
    vendorId:'',
    userId:this.uId,
    img:''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookservicePage');
    this.request.vendorId =  this.navParams.data;

    this.userRef.on('value', handy => {
      this.address=handy.val()[this.uId]['address1'];
      this.postCode=handy.val()[this.uId]['postcode'];
      this.city=handy.val()[this.uId]['city'];
      this.state=handy.val()[this.uId]['state'];
    });
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.newAddress.place = data;
    });
    modal.present();
  }
   ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems = [];
    this.autocomplete = {
    query: ''
    };        
    }
    updateSearch() {
      console.log('modal > updateSearch');
      if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
      }
      let self = this; 
      let config = { 
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query, 
      componentRestrictions: {  } 
      }
      this.acService.getPlacePredictions(config, function (predictions, status) {
        console.log('modal > getPlacePredictions > status > ', status);
        self.autocompleteItems = [];            
        predictions.forEach(function (prediction) {              
        self.autocompleteItems.push(prediction);
        });
        });
        }
    
  chooseItem(item){
    this.address = item.description
  }

  //to navigate back to previous segment
  back(){
    switch(this.step) { 
      case "step1": 
         break;
      case "step2":
         this.step ="step1"; 
         break; 
      case "step3":
        this.step ="step2"; 
        break; 
      case "step4":
        this.step ="step3"; 
        break;
    }
  }
  
  next(){
    switch(this.step) { 
      case "step1": 
        this.step = "step2";
         break; 
      case "step2": 
         this.step ="step3"; 
         break; 
      case "step3": 
        this.step ="step4"; 
        break; 
      case "step4":
        break; 
    } 
  }

  goToViewService(){
    this.navCtrl.pop();
  }

  goToDashboard(){
    this.navCtrl.popToRoot();
  }

  submitRequest(){
    if(this.imageURI!=null){
      this.uploadImage(this.imageURI).then((snapshot : any) =>
      {
      let uploadedImage : any = snapshot.downloadURL;
      console.log(uploadedImage);
      //sets the image to user object
      this.request.img = uploadedImage;
      console.log(this.request.img);
      this.pushData();
      //this.showAlert();
      });
    }else{
      this.pushData();
    }
    
  }

  pushData(){
    
    try{
      console.log(this.uId);
      this.request.address=this.address+", "+this.postCode+", "+this.city+", "+this.state;
      this.request.budget="RM "+this.budget;
      this.valueRef.push(this.request);
      console.log("send request successful!");
      this.showAlert();
      this.goToDashboard();
    }catch(error) {
      let alert = this.alertCtrl.create({
      title: "Submit Failed",
      subTitle: error,
      buttons: ['Ok']
      });
      alert.present();
    }
  }

  selectImage() : Promise<any>
  {
    console.log("select img!")
     return new Promise(resolve =>
     {
        let cameraOptions : CameraOptions = {
            sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType    : this.camera.DestinationType.DATA_URL,
            quality            : 100,
            targetWidth        : 320,
            targetHeight       : 240,
            encodingType       : this.camera.EncodingType.JPEG,
            correctOrientation : true
        };

        this.camera.getPicture(cameraOptions)
        .then((data) =>
        {
           this.imageURI 	= "data:image/jpeg;base64," + data;
           resolve(this.imageURI);
        });


     });
  }

  uploadImage(imageString) : Promise<any>
  {
     let image       : string  = 'requestImg-' + new Date().getTime() + '.jpg',
         storageRef  : any,
         parseUpload : any;

     return new Promise((resolve, reject) =>
     {
        storageRef       = firebase.storage().ref(image);
        parseUpload      = storageRef.putString(imageString, 'data_url');

        parseUpload.on('state_changed', (_snapshot) =>
        {
           // We could log the progress here IF necessary
            console.log('snapshot progess ' + _snapshot);
        },
        (_err) =>
        {
           reject(_err);
        },
        (success) =>
        {
           resolve(parseUpload.snapshot);
        });
     });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Your request has been sent to the vendor!',
      buttons: ['OK']
    });
    alert.present();
  
  }
}
