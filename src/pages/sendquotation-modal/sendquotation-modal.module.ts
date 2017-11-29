import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendquotationModalPage } from './sendquotation-modal';

@NgModule({
  declarations: [
    SendquotationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SendquotationModalPage),
  ],
  exports: [
    SendquotationModalPage
  ]
})
export class SendquotationModalPageModule {}
