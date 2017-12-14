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
    dob: string, phoneNumber: string, gender: string, age: any, race: string, nationality: string,
    address1: string, address2: string, address3: string, postcode: string, city: string, state: string, type: string
  } = {
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
  vendorDetails: { companyName: string, companyInfo: string, SSMNumber: string, officeNumber1: string, officeNumber2: string, cAddress1: string, cAddress2: string, openHours: string, closeHours: string } = {
    companyName: '',
    companyInfo: '',
    SSMNumber: '',
    officeNumber1: '',
    officeNumber2: '',
    cAddress1: '',
    cAddress2: '',
    openHours: '',
    closeHours: '',
  };

  submitAttempt: boolean = false;
  public signupForm: any; //second segment
  public signupForm2: any; //third segment
  public signupForm3: any; //fourth segment
  public step: any;

  //boolean to check user clicked user or handy during first page
  //false, if vendor
  public isUserSelected = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public builder: FormBuilder,
    public alertCtrl: AlertController,
    public authService: AuthService) {

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
            this.signupForm.reset();
            this.signupForm2.reset();
            this.signupForm3.reset();
            this.step = "step1";
          }
        }
      ],
    });
    alert.present();
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


  signup() {
    this.submitAttempt = true;
    if (this.signupForm2.valid && this.step === 'step3') {
      //sign up user
      this.authService.register(this.account).then(() => {
        //push personalDetails to firebase here
        this.pushToFirebase();
        console.log("Register Successful!");
      });

    }

    if (this.signupForm3.valid && this.step === 'step4') {
      //sign up user
      this.authService.register(this.account).then(() => {
        //push vendorDetails and personalDetails to firebase here
        this.pushToFirebase();
        console.log("Register Successful!");
      });

    }

  }

  dashboardPage() { this.navCtrl.push(Dashboard); }
  loginPage() { this.navCtrl.push(UserLogin); }
  forgotPasswordPage() { this.navCtrl.push(UserForgotpassword); }

}
