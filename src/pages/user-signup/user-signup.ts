import { Component } from '@angular/core';
// import UI controllers 
import { IonicPage, LoadingController, NavController, ToastController, ModalController, NavParams, AlertController, MenuController } from 'ionic-angular';
'../user-forgotpassword/user-forgotpassword';
import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import moment from 'moment';
import { AuthService } from '../../providers/auth-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})

export class UserSignup {

  //Firebase references
  userRef: any;
  vendorRef: any;
  roleRef: any;
  currentUser: any;

  //Basic account details
  account: { email: string, fName: string, lName: string, password: string, cfmPassword: string } = {
    email: '',
    password: '',
    fName: '',
    lName: '',
    cfmPassword: '',
  };

  //Personal Details
  personalDetails: {
    fName: string, lName: string, dob: string, phoneNumber: string, gender: string, age: any, race: string, nationality: string, address1: string, address2: string, address3: string, postcode: string, city: string, state: string, type: string
  } = {
      fName: '',
      lName: '',
      dob: '',
      phoneNumber: '',
      gender: '',
      age: '',
      race: '',
      nationality: '',
      address1: '',
      address2: '',
      address3: '',
      postcode: '',
      city: '',
      state: '',
      type: '',
    };

  //Vendor Details 
  vendorDetails: {companyName: string, companyInfo: string, SSMNumber: string, officeNumber1: string, officeNumber2: string, cAddress1: string, cAddress2: string, openHours: string, closeHours: string, image: string} = {
    companyName: '',
    companyInfo: '',
    SSMNumber: '',
    officeNumber1: '',
    officeNumber2: '',
    cAddress1: '',
    cAddress2: '',
    openHours: '',
    closeHours: '',
    image: ''
  };

  submitAttempt: boolean = false;
  public signupForm: any; //second segment
  public signupForm2: any; //third segment
  public signupForm3: any; //fourth segment
  public step: any;

  //boolean to check user clicked user or handy during first page
  //false, if vendor
  public isUserSelected = true;

  //for holding image URI
  imageURI:any;
  imageFileName:any;  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public builder: FormBuilder,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    private camera: Camera, ) {
      
      //default page for ion-segment when page loads  
      this.step = "step1";

      //validation for signupForm(s)
      this.signupForm = this.builder.group({
        username: ['', Validators.compose([Validators.email, Validators.required])],
        fName: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.pattern('[a-zA-Z ]*')])],   
        lName: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
        //Custom validator to check if password === cfmPassword
        passwords: this.builder.group({
          password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
          cfmPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        }, {validator: this.areEqual})
      });

      this.signupForm2 = this.builder.group({
        dob: ['', Validators.required],
        phoneNumber: ['', Validators.compose([Validators.maxLength(11), Validators.required])],
        gender: ['', Validators.required],
        age: ['', ],
        race: ['', Validators.required],
        nationality: ['', Validators.required],
        address1: ['', Validators.required],
        address2: ['', ],
        address3: ['', ],
        postcode: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
      });

    //validation for signupForm(s)
    this.signupForm = this.builder.group({
      username: ['', Validators.compose([Validators.email, Validators.required])],
      fName: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      lName: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      //Custom validator to check if password === cfmPassword
      passwords: this.builder.group({
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        cfmPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      }, { validator: this.areEqual })
    });

    this.signupForm2 = this.builder.group({
      dob: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.maxLength(11), Validators.required])],
      gender: ['', Validators.required],
      age: ['',],
      race: ['', Validators.required],
      nationality: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['',],
      address3: ['',],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });

    this.signupForm3 = this.builder.group({
      companyName: ['', Validators.required],
      companyInfo: ['', Validators.required],
      SSMNumber: ['', Validators.required],
      officeNumber1: ['', Validators.required],
      officeNumber2: [''],
      cAddress1: ['', Validators.required],
      cAddress2: ['',],
      openHours: ['', Validators.required],
      closeHours: ['', Validators.required],
    });

    //define firebase references
    this.userRef = firebase.database().ref('/Handys/user/');
    this.vendorRef = firebase.database().ref('/Handys/vendor/');
    this.roleRef = firebase.database().ref('/Handys/user_roles/');

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = firebase.auth().currentUser;
      }
   });
  }

  //calculate age from dob via moment.js
  setAge() {
    var age = moment().diff(this.personalDetails.dob, 'years');
    this.personalDetails.age = age;
  }

  //validate password equals confirm password
  areEqual(group: FormGroup) {
    if (group.controls['password'].value === group.controls['cfmPassword'].value) {
      return null;
    }
    else {
      return {
        "Passwords mismatch.": true
      };
    }

  }

  //fired when user click sign up as a user
  signupAsUser() {
    //used to hide the last page
    this.isUserSelected = true;
    this.personalDetails.type = "user";
    //advance to second page
    this.step = "step2";
  }

  //fired when user click sign up as a handy
  signupAsHandy() {
    this.isUserSelected = false;
    this.personalDetails.type = "vendor";
    //advance to 2nd page
    this.step = "step2";
  }

  //to navigate back to previous segment
  back() {
    this.submitAttempt = false;
    switch (this.step) {
      case "step1":
        break;
      case "step2":
        this.clearForms();
        break;
      case "step3":
        this.step = "step2";
        break;
      case "step4":
        this.step = "step3";
        break;
    }
  }


  //clears the forms when user retreats to role selection page
  clearForms() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle: "Are you sure you want to go back? This will empty the forms.",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("No Clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes Clicked");
            //resets all form
            this.resetForms();
            this.step = "step1";
          }
        }
      ],
    });
    alert.present();
  }

  //resets the forms back to their pristine state
  resetForms(){
    this.signupForm.reset();
    this.signupForm2.reset();
    this.signupForm3.reset();
  }
  
  advanceForm() {
    this.submitAttempt = false;
    switch (this.step) {
      case "step1":
        this.step = "step2";
        break;
      case "step2":
        this.step = "step3";
        break;
      case "step3":
        this.step = "step4";
        break;
    }
  }

  next() {
    this.submitAttempt = true;
    if (this.step === 'step1') {
      this.advanceForm();
    }
    else if (this.signupForm.valid && this.step === 'step2') {
      console.log(this.account);
      this.advanceForm();
    }
    else if (this.signupForm2.valid && this.step === 'step3') {
      console.log(this.personalDetails);
      this.advanceForm();
    }
    else if (this.signupForm3.valid && this.step === 'step4') {
      console.log(this.vendorDetails);
      this.advanceForm();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
    this.menu.swipeEnable(false);
  }

  //Push formControl data to firebase
  pushToFirebase() {
    this.personalDetails.fName = this.account.fName;
    this.personalDetails.lName = this.account.lName;
    var data = (this.isUserSelected) ? this.personalDetails : Object.assign(this.personalDetails, this.vendorDetails);
    //push to user node
    if (this.isUserSelected) {
      this.userRef.child(this.currentUser.uid).set(data);
      this.roleRef.child(this.currentUser.uid).set({ role: "user" });
    }
    else {
      //push to vendor node
      this.vendorRef.child(this.currentUser.uid).set(data);
      this.roleRef.child(this.currentUser.uid).set({ role: "vendor" });
    }
  }


  signup(){
    console.log(this.isUserSelected);
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you confirm sign up?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            try {
                this.submitAttempt = true;
                if ((this.signupForm2.valid && this.step === 'step3') || (this.signupForm3.valid && this.step === 'step4')) {
                  //sign up user
                  this.authService.register(this.account).then(() => {
                    //push personalDetails to firebase here
                    this.pushToFirebase();
                    console.log("Register Successful!");
                  });
                }
                let toast = this.toastCtrl.create({
                  message: 'Registration Successful! Please login now',
                  duration: 3000,
                  position: 'button'
                });
                toast.present();
                this.loginPage();      
            } catch (error) {
              let alert = this.alertCtrl.create({
                title: "Login Failed",
                subTitle: error.errorMessage,
                buttons: ['Ok']
              });
              alert.present();
            }
          }
        }
      ]
    });
    confirm.present();

  }
  

/*   getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  } */

  selectImage() : Promise<any>
  {
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
     let image       : string  = 'companyLogo-' + new Date().getTime() + '.jpg',
         storageRef  : any,
         parseUpload : any;

     return new Promise((resolve, reject) =>
     {
        storageRef       = firebase.storage().ref(image);
        parseUpload      = storageRef.putString(imageString, 'data_url');

        parseUpload.on('state_changed', (_snapshot) =>
        {
           // We could log the progress here IF necessary
           // console.log('snapshot progess ' + _snapshot);
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

  

  /* uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  } */

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  loginPage(){ this.navCtrl.pop();}
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword);}

}
