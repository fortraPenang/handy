import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookservicePage } from './bookservice';


@NgModule({
  declarations: [
    BookservicePage,
  ],
  imports: [
    IonicPageModule.forChild(BookservicePage),
  ],
  exports: [
    BookservicePage
  ]
})
export class BookservicePageModule {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
