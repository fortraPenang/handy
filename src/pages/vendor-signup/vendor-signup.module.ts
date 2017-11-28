import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorSignupPage } from './vendor-signup';

@NgModule({
  declarations: [
    VendorSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorSignupPage),
  ],
  exports: [
    VendorSignupPage
  ]
})
export class VendorSignupPageModule {}
