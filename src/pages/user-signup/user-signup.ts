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
  account: { email: string, fName: string, lName: string, password: string, cfmPassword: string } = {
    email: '',
    password: '',
    fName: '',
    lName: '',
    cfmPassword: '',
  }; 
  submitAttempt: boolean = false;  
  public signupForm: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public builder: FormBuilder) {
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
  
  }


  ngOnInit(){

  }

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


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
    this.menu.swipeEnable(false);
  }

  signup(){
    debugger;
    this.submitAttempt = true;

    //check client-side validation
    if(this.signupForm.valid){

    }

  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  loginPage(){ this.navCtrl.push(UserLogin);}
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword);}

}
