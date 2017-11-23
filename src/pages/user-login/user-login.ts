import { Component } from '@angular/core';
// import UI controllers 
import { IonicPage, LoadingController, NavController, ToastController, ModalController, NavParams, AlertController , MenuController} from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { UserSignup } from '../user-signup/user-signup';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { AuthService } from '../../providers/auth-service';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
// form builder and validators
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {  
  account: { email: string, password: string } = {
    email: '',
    password: ''
  }; 
  
  public loginForm :any;
  submitAttempt: boolean = false;  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService, 
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public builder: FormBuilder,
    public googlePlus: GooglePlus,
    public afAuth: AngularFireAuth,
    public menuCtrl: MenuController) {

    this.loginForm = builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad UserLogin');
    this.menuCtrl.swipeEnable(false);
  }
  

 dashboardPage(){ this.navCtrl.push(Dashboard); }
 signupPage(){ this.navCtrl.push(UserSignup); }
 forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword); }

  //attempt the normal login with email and password
  doLogin(){
    this.submitAttempt = true;
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    //check client-side validation
    if(this.loginForm.valid){
      console.log(this.account);
      this.authService.login(this.account).then((authData) => {
        //successful
        console.log(authData);
        //toast to inform user
        let toast = this.toastCtrl.create({
          message: 'Login Successful. Welcome ' + this.account.email + ' !',
          duration: 3000,
          position: 'button'
        });
        toast.onDidDismiss(() => {
          console.log("Dismissed toast");
        })
        toast.present();
        this.menuCtrl.swipeEnable(true);
        this.navCtrl.popToRoot();
        this.dashboardPage();
      }, (error) => {
        console.log(error);
        var errorCode = error.code;
        var errorMsg = error.message;
        //custom error message
        if (errorCode == "auth/user-disabled" || errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password") errorMsg = "Wrong username or password.";
        if(errorCode == "auth/invalid-email") errorMsg = "Please provide email with the correct format."; 
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
    
  }

  openModal(){
    const phoneLogin = this.modalCtrl.create('ModalPage');
    phoneLogin.present();
  }

  //sign in via google
  signInGoogle(){
    console.log("Google pressed");
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.authService.loginGoogle().then((res) => {
      this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then((suc) => {
        console.log(suc);
        this.navCtrl.setRoot(Dashboard);
      }).catch((err) => {
        let alert = this.alertCtrl.create({
          title: "Login Failed",
          subTitle: err,
          buttons: ['Confirm']
        });
        alert.present();
        loader.dismiss();
      });
    });
  }
}
