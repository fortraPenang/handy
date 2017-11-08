import { Component } from '@angular/core';
// import UI controllers 
<<<<<<< HEAD
import { IonicPage, LoadingController, NavController, ToastController, ModalController, NavParams, AlertController } from 'ionic-angular';
=======
import { IonicPage, LoadingController, NavController, ToastController, ModalController, NavParams, AlertController , MenuController} from 'ionic-angular';
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322
import { Dashboard } from '../dashboard/dashboard';
import { UserSignup } from '../user-signup/user-signup';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { AuthService } from '../../providers/auth-service';
<<<<<<< HEAD
// form builder and validators
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
// form builder and validators
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {  
<<<<<<< HEAD
 account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  public loginForm :any;
  submitAttempt: boolean = false;  
 constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
=======
  account: { email: string, password: string } = {
    email: '',
    password: ''
  }; 
  public loginForm :any;
  submitAttempt: boolean = false;  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService, 
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
<<<<<<< HEAD
    public builder: FormBuilder) {

   this.loginForm = builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
=======
    public builder: FormBuilder,
    public googlePlus: GooglePlus,
    public afAuth: AngularFireAuth,
    public menuCtrl: MenuController) {

    this.loginForm = builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

>>>>>>> 95a965fe16b68332ef3888883401ad327299e322
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad UserLogin');
  }
  

 dashboardPage(){ this.navCtrl.push(Dashboard); }
  signupPage(){ this.navCtrl.push(UserSignup); }
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword); }


<<<<<<< HEAD
 doLogin(){
=======
  doLogin(){
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322
    this.submitAttempt = true;
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    if(this.loginForm.valid){
      console.log(this.account);
      this.authService.login(this.account).then(authData => {
        //successful
        console.log(authData);
<<<<<<< HEAD
=======
        this.menuCtrl.swipeEnable(true);
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322
        this.navCtrl.setRoot(Dashboard);
      }, error => {
        console.log(error);
        var errorCode = error.code;
        var errorMsg = error.message;
        //custom error message
        if (errorCode == "auth/user-disabled" ||
            errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password") errorMsg = "Wrong username or password.";
<<<<<<< HEAD
        if(errorCode == "auth/invalid-email") errorMsg = "Please provide email with the correct format.";
=======
        if(errorCode == "auth/invalid-email") errorMsg = "Please provide email with the correct format."; 
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322
        let alert = this.alertCtrl.create({
          title: "Login Failed",
          subTitle: errorMsg,
          buttons: ['Confirm']
        });
        alert.present();
        loader.dismiss();
      });
      loader.present();
    }
    
<<<<<<< HEAD
 }
}
=======
  }

  signInGoogle(){
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.googlePlus.login({
      'webClientId' : '447284265080-llk2rv349uf9lv2iah4oiftuq6secopg.apps.googleusercontent.com',
      'offline' : true,  
    }).then((res) => {
      this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then((suc) => {
        console.log(suc);
        this.navCtrl.setRoot(Dashboard);
      }).catch((err) =>{
        let alert = this.alertCtrl.create({
          title: "Login Failed",
          subTitle: err,
          buttons: ['Confirm']
        });
        alert.present();
        loader.dismiss();
      })
    })
  }
}
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322
