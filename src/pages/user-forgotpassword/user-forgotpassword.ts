import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserSignup } from '../user-signup/user-signup';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController,LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-forgotpassword',
  templateUrl: 'user-forgotpassword.html',
})
export class UserForgotpassword {

  public resetpwdForm;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, public authService: AuthService, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.resetpwdForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  resetPwd() {
    if (!this.resetpwdForm.valid){
      console.log(this.resetpwdForm.value);
    } else {
      this.authService.resetPassword(this.resetpwdForm.value.email).then( authService => {
        let alert = this.alertCtrl.create({
          message: "Reset password link has been sent to your.",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
        this.loginPage();
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserForgotpassword');
  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  loginPage(){ this.navCtrl.push(UserLogin); }
  signupPage(){ this.navCtrl.push(UserSignup); }

}
