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

  //First form
  account: { email: string, fName: string, lName: string, password: string, cfmPassword: string } = {
    email: '',
    password: '',
    fName: '',
    lName: '',
    cfmPassword: '',
  }; 

  //Personal Details
  personalDetails: { } = {

  };

  //Vendor Details 
  vendorDetails: {} = {

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
    public builder: FormBuilder) {
      
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
    this.submitAttempt = true;

    //check client-side validation
    if(this.signupForm.valid){

    }

  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  loginPage(){ this.navCtrl.push(UserLogin);}
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword);}

}
