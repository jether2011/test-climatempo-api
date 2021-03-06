import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the CitiesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CitiesServiceProvider {
  headers = {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  urlCities: string = "https://spring-climatempo-bridge.herokuapp.com/api/v1/climatempo/locale/";
  urlCity: string = "https://spring-climatempo-bridge.herokuapp.com/api/v1/climatempo/weather/";
  public data: any;
  public dataWeather: any;

  constructor(public http: HttpClient) {
    console.log("CitiesServiceProvider");
    console.log(this.urlCities);
    console.log(this.urlCity);
  }

  loadCities(state: any) {
    let body = JSON.stringify(this.data);
    let headersRequest = new Headers(this.headers);
    let options = new RequestOptions({ headers: headersRequest });

    if (this.data) {
      return Promise.resolve(this.data);
    }

    console.log(state);
    return new Promise(resolve => {
      this.http.get(this.urlCities + `${state}`)  
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  getCity (idCity: number) {
    if (this.dataWeather) {
      return Promise.resolve(this.dataWeather);
    }

    return new Promise(resolve => {
      this.http.get(this.urlCity + `${idCity}`)
      .subscribe(dataWeather => {
        this.dataWeather = dataWeather;
        resolve(this.dataWeather);
      })
    });
  }
}