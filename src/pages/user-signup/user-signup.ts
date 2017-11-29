import { Component } from '@angular/core';
// import UI controllers 
import { IonicPage, LoadingController, NavController, ToastController, ModalController, NavParams, AlertController , MenuController} from 'ionic-angular';
'../user-forgotpassword/user-forgotpassword';
import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { FormBuilder, FormGroup, Validators,
FormControl} from '@angular/forms';
import * as firebase from 'firebase/app';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})

export class UserSignup implements OnInit{

  //configure database
  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/');

  //First form
  account: { email: string, fName: string, lName: string, password: string, cfmPassword: string } = {
    email: '',
    password: '',
    fName: '',
    lName: '',
    cfmPassword: '',
  }; 

  //Personal Details
  personalDetails: {dob: string, phoneNumber: number, gender: string, age: string, race: string, nationality: string, address1: string,
  address2: string, address3: string, postcode: number, city: string, state: string, } = {
    dob: '',
    phoneNumber: null,
    gender: '',
    age: '',
    race: '',
    nationality: '',
    address1: '',
    address2: '',
    address3: '',
    postcode: null,
    city: '',
    state: '',
  };

  //Vendor Details 
  vendorDetails: {    companyName: string, companyInfo: string, SSMNumber: string, officeNumber1: number, officeNumber2: number, cAddress1: string,
  cAddress2: string, openHours: string, closeHours: string,} = {
    companyName: '',
    companyInfo: '',
    SSMNumber: '',
    officeNumber1: null,
    officeNumber2: null,
    cAddress1: '',
    cAddress2: '',
    openHours: '',
    closeHours: '',
  };

  submitAttempt: boolean = false;  
  public signupForm: any; //second segment
  public signupForm2: any; //third segment
  public signupForm3: any; //fourth segment
  public step: any; //for the segment
  
  //boolean to check user clicked user or handy during first page
  //false, if vendor
  public isUserSelected = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public builder: FormBuilder,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
      
      //default page for ion-segment when page loads  
      this.step = "step1";

      //validation for signupForm
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
        dob: ['', ],
        phoneNumber: ['', ],
        gender: ['', ],
        age: ['', ],
        race: ['', ],
        nationality: ['', ],
        address1: ['', ],
        address2: ['', ],
        address3: ['', ],
        postcode: ['', ],
        city: ['', ],
        state: ['', ],
      });

      this.signupForm3 = this.builder.group({
        companyName: ['', ],
        companyInfo: ['', ],
        SSMNumber: ['', ],
        officeNumber1: ['', ],
        officeNumber2: ['', ],
        cAddress1: ['', ],
        cAddress2: ['', ],
        openHours: ['', ],
        closeHours: ['', ],
      });



  
  }


  ngOnInit(){

  }

  //validate password equals confirm password
  areEqual(group: FormGroup){
    if(group.controls['password'].value === group.controls['cfmPassword'].value){
      return null;
    }
    else{
      return {
        "Passwords mismatch." : true
      };
    }
  
  }

  //fired when user click sign up as a user
  signupAsUser(){ 
    this.isUserSelected = true;
    //Do something here
    //advance to second page
    this.step = "step2"; 
  }

  //fired when user click sign up as a handy
  signupAsHandy(){
    this.isUserSelected = false;
    //Do something here

    //advance to 2nd page
    this.step = "step2";
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

  advanceForm(){
    switch(this.step) { 
      case "step1": 
        this.step = "step2";
        this.submitAttempt = false;
         break; 
      case "step2": 
         this.step ="step3"; 
         this.submitAttempt = false;
         break; 
      case "step3": 
        this.step ="step4"; 
        this.submitAttempt = false;
        break; 
    } 
  }

  next(){
    this.submitAttempt = true;
    if(this.step === 'step1'){
      this.advanceForm();
    }
    else if(this.signupForm.valid && this.step === 'step2'){
      this.advanceForm();
    }
    else if(this.signupForm2.valid && this.step === 'step3'){
      this.advanceForm();
    }
    else if(this.signupForm3.valid && this.step === 'step4'){
      this.advanceForm();
    }
    else{
      //didnt pass validation 
      
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
    this.menu.swipeEnable(false);
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
              if(this.isUserSelected){
                this.valueRef.child('user').push(
                  {
                    email: this.account.email,
                    password: this.account.password,
                    fName: this.account.fName,
                    lName: this.account.lName,
                    cfmPassword: this.account.cfmPassword,
                    dob: this.personalDetails.dob,
                    phoneNumber: this.personalDetails.phoneNumber,
                    gender: this.personalDetails.gender,
                    age: this.personalDetails.age,
                    race: this.personalDetails.race,
                    nationality: this.personalDetails.nationality,
                    address1: this.personalDetails.address1,
                    address2: this.personalDetails.address2,
                    address3: this.personalDetails.address3,
                    postcode: this.personalDetails.postcode,
                    city: this.personalDetails.city,
                    state: this.personalDetails.state,
                  }
                )
                let toast = this.toastCtrl.create({
                  message: 'Registration Successful! Please login now',
                  duration: 3000,
                  position: 'button'
                });
                toast.present();
                this.loginPage();
              }else{
                this.valueRef.child('vendor').push(
                  {
                    email: this.account.email,
                    password: this.account.password,
                    fName: this.account.fName,
                    lName: this.account.lName,
                    cfmPassword: this.account.cfmPassword,
                    dob: this.personalDetails.dob,
                    phoneNumber: this.personalDetails.phoneNumber,
                    gender: this.personalDetails.gender,
                    age: this.personalDetails.age,
                    race: this.personalDetails.race,
                    nationality: this.personalDetails.nationality,
                    address1: this.personalDetails.address1,
                    address2: this.personalDetails.address2,
                    address3: this.personalDetails.address3,
                    postcode: this.personalDetails.postcode,
                    city: this.personalDetails.city,
                    state: this.personalDetails.state,
                    companyName: this.vendorDetails.companyName,
                    companyInfo: this.vendorDetails.companyInfo,
                    SSMNumber: this.vendorDetails.SSMNumber,
                    officeNumber1: this.vendorDetails.officeNumber1,
                    officeNumber2: this.vendorDetails.officeNumber2,
                    cAddress1: this.vendorDetails.cAddress1,
                    cAddress2: this.vendorDetails.cAddress2,
                    openHours: this.vendorDetails.openHours,
                    closeHours: this.vendorDetails.closeHours,
                  }
                  
                ) 
                let toast = this.toastCtrl.create({
                  message: 'Registrtion Successful! Please login now',
                  duration: 3000,
                  position: 'button'
                });
                toast.present();
                this.loginPage();            
              }
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

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  loginPage(){ this.navCtrl.pop();}
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword);}

}
