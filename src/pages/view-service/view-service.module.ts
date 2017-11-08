import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewServicePage } from './view-service';

@NgModule({
  declarations: [
    ViewServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewServicePage),
  ],
  exports: [
    ViewServicePage
  ]
})
export class ViewServicePageModule {}
