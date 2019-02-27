import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { PoHeader } from '../../models/po-header';

/*
  Generated class for the PoHeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PoHeaderProvider {

  constructor(public api: Api) { }

  getPoHeaderList(username?: string) {
    const data = `<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZmobilePoHeader%3E
            <PurchaseHeader>
              <item>
                  <Sno></Sno>
                  <Ebeln></Ebeln>
                  <Aedat></Aedat>
                  <Utime></Utime>
                  <Netwr></Netwr>
                  <Status></Status>
              </item>
            </PurchaseHeader>
            <Username>NAKKALAU</Username>
        </urn:ZmobilePoHeader%3E
      </soapenv:Body>
  </soapenv:Envelope>`;
    return this.api.post('poheader/1.0/', data).map(data => {
      let poHeaderItems: PoHeader[] = [];
      const poHeader = data.n0ZmobilePoHeaderResponse.PurchaseHeader.item;
      poHeader.forEach(poObj => {
        poHeaderItems.push(new PoHeader(poObj));
      });
      return poHeaderItems;
    });
  }
}
