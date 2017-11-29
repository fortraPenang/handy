import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSendquotationPage } from './user-sendquotation';

@NgModule({
  declarations: [
    UserSendquotationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSendquotationPage),
  ],
  exports: [
    UserSendquotationPage
  ]
})
export class UserSendquotationPageModule {}
