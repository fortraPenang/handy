import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingWorkPage } from './pending-work';

@NgModule({
  declarations: [
    PendingWorkPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingWorkPage),
  ],
  exports: [
    PendingWorkPage
  ]
})
export class PendingWorkPageModule {}
