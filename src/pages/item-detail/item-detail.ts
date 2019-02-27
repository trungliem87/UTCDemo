import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PoItem } from '../../models/po-item';
import { PoItemProvider } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  currentItems: PoItem[];
  poHeader: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public poItem: PoItemProvider) {
    this.poHeader = navParams.get('item');
    this.poItem.getPoItemList(this.poHeader.Ebeln).subscribe(data => {
      this.currentItems = data;
    });
  }

  doApprove(ponum: number, apprej: number) {
    this.poItem.poApproval(ponum, apprej).subscribe();
  }
}
