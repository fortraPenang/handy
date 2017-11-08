import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchCategoryPage } from './search-category';

@NgModule({
  declarations: [
    SearchCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchCategoryPage),
  ],
  exports: [
    SearchCategoryPage
  ]
})
export class SearchCategoryPageModule {}
