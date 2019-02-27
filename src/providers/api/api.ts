import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import xml2js from 'xml2js';
import * as _ from 'lodash';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost:3000';
  // url: string = 'https://CHKKLK02.AP.CARRIER.UTC.COM:8243';
  constructor(public http: HttpClient) { }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    const headers = new HttpHeaders({
      'Accept': 'application/soap+xml',
      'Content-Type': 'application/soap+xml',
      Authorization: 'Bearer 0edef49e-f826-303f-acd8-e423e3ab5a1e'
    });
    if (!reqOpts) {
      reqOpts = {
        headers: headers,
        responseType: 'text'
      };
    }
    return this.http.post(this.url + '/' + endpoint, body, reqOpts).map(data => {
      return this.convertXmltoJson(data);
    });
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  convertXmltoJson(data) {
    let returnData;
    xml2js.parseString(data, { explicitArray: false }, (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        returnData = this.renameKeysDeep(result);
      }
    });
    return returnData.envEnvelope.envBody;
  }

  renameKeysDeep(obj) {
    return _.transform(obj, (result, value, key) => { // transform to a new object
      var currentKey = _.isNumber(key) ? key : key.split(':').join(''); // if the key is in keysMap use the replacement, if not use the original key

      result[currentKey] = _.isObject(value) ? this.renameKeysDeep(value) : value; // if the key is an object run it through the inner function - replaceKeys
    });
  }
}
