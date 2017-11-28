import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickServicePage } from './quick-service';

@NgModule({
  declarations: [
    QuickServicePage,
  ],
  imports: [
    IonicPageModule.forChild(QuickServicePage),
  ],
  exports: [
    QuickServicePage
  ]
})
export class QuickServicePageModule {}
