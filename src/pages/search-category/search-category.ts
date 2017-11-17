import { Component } from '@angular/core';
import firebase from 'firebase';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchCategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-category',
  templateUrl: 'search-category.html',
})
export class SearchCategoryPage {

  public handys:any;
  index:any;
  //con
  public organisation_name:any;
  public addressLine1:any;
  public img: any;
  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/vendor/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchCategoryPage');
    this.valueRef.on('value', handy => {
      this.index=this.navParams.data;
      this.img=handy.val()[this.index]['image'];
      this.organisation_name=handy.val()[this.index]['organisation_name'];
      this.addressLine1=handy.val()[this.index]['addressLine1'];
      //console.log(this.handys);
      /* 
      console.log(this.handys[0]['image']);
      this.img = this.handys[0]['image']; */
    });
  }

}
