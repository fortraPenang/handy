import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewrequestServicePage } from './newrequest-service';

@NgModule({
  declarations: [
    NewrequestServicePage,
  ],
  imports: [
    IonicPageModule.forChild(NewrequestServicePage),
  ],
  exports: [
    NewrequestServicePage
  ]
})
export class NewrequestServicePageModule {}
