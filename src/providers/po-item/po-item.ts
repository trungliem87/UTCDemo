import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { PoItem } from '../../models/po-item';

/*
  Generated class for the PoItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PoItemProvider {

  constructor(public api: Api) { }

  getPoItemList(poHeader?: number) {
    const data = `<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZmobilePoItem>
            <Poitem>
              <item>
                  <Ebeln></Ebeln>
                  <Ebelp></Ebelp>
                  <Knttp></Knttp>
                  <Matnr></Matnr>
                  <Maktg></Maktg>
                  <Menge></Menge>
                  <Meins></Meins>
                  <Eindt></Eindt>
                  <Netpr></Netpr>
              </item>
            </Poitem>
            <Ponumber>${poHeader}</Ponumber>
        </urn:ZmobilePoItem>
      </soapenv:Body>
    </soapenv:Envelope>`;
    return this.api.post('poitem/1.0/', data).map(data => {
      let poItems: PoItem[] = [];
      const poItemList = data.n0ZmobilePoItemResponse.Poitem.item;
      poItemList.forEach(poObj => {
        poItems.push(new PoItem(poObj));
      });
      return poItems;
    });
  }

  poApproval(ponum: number, apprej: number) {
    const data = `<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZmobilePoReject>
          <Apprej>${apprej}</Apprej>
          <Ponumber>${ponum}</Ponumber>
       </urn:ZmobilePoReject>
    </soapenv:Body>
    </soapenv:Envelope>`;
    return this.api.post('poapproval/1.0/', data).map(data => {
      return data.n0ZmobilePoRejectResponse;
    });
  }
}
