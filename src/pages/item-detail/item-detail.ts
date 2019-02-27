import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, navParams: NavParams, public poItem: PoItemProvider, public alertController: AlertController) {
    this.poHeader = navParams.get('item');
    this.poItem.getPoItemList(this.poHeader).subscribe(data => {
      this.currentItems = data;
    });
  }

  doApprove(ponum: number, apprej: number) {
    this.poItem.poApproval(ponum, apprej).subscribe(res => {
      console.log(res);
      if (res.Status) {
        this.presentAlert("Approve succeed !");
      } else if (res.Return.item.Code) {
        this.presentAlert(res.Return.item.Message);
      } else {
        this.presentAlert("Reject succeed !");
      }
    });
  }

  private presentAlert(info) {
    let alert = this.alertController.create({
      title: 'Alert',
      subTitle: info,
      buttons: ['OK']
    });
    alert.present();
  }
}
