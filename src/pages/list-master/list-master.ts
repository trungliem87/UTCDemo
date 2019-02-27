import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { PoHeader } from '../../models/po-header';
import { PoHeaderProvider } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: PoHeader[];
  allItems: PoHeader[];

  constructor(public navCtrl: NavController, public poHeader: PoHeaderProvider, public modalCtrl: ModalController) {
    this.poHeader.getPoHeaderList().subscribe(data => {
      this.currentItems = data;
      this.allItems = data;
    });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  deleteItem() {
    console.log('deleted poheader');
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: PoHeader) {
    this.navCtrl.push('ItemDetailPage', {
      item: item.Ebeln
    });
  }

  onChange(value) {
    switch (value) {
      case "rejected":
        this.currentItems = this.allItems.filter(item => item.Status == "R");
        break;
      case "approved":
        this.currentItems = this.allItems.filter(item => item.Status == "A");
        break;
      case "pending":
        this.currentItems = this.allItems.filter(item => item.Status == "P");
        break;
      default:
        this.currentItems = this.allItems;
        break
    }
  }
}
