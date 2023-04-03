import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ICalender } from './utils';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  // host = "https://fundtrack.onrender.com";
  // host = 'http://192.168.1.5:8080'
  sendURL = "/entry";
  listURL = "/tracklist";
  getURL = "/getentry";
  updateURL = "/update";
  registerURL = "/register";
  loginURL = '/login';

  // Credit card
  CreditcardAddURL = '/creditcarduse';
  creditcardPayURL = '/creditcardpay';
  getCreditcarduseURL = '/getcreditcarduse';
  getCreditcardpayURL = '/getcreditcardpay';
  creditcardUsedListURL = '/getCreditCardUsedlist';
  creditcardPaysListURL = '/getCreditCardPayslist';
  deletecreditcardPayURL = '/deletecreditcardpay';
  deletecreditcardUseURL = '/deletecreditcarduse';
  updatecreditcarduseURL = '/creditcarduseupdate';

  constructor(private http: HttpClient) { }

  private getAPI(url: string, params?: any): Observable<any> {
    if (params) {
      return this.http.get(url, params).pipe(catchError(this.handleError));
    } else {
      return this.http.get(url).pipe(catchError(this.handleError));
    }  
  }

  private postAPI(url: string, record: any): Observable<any> {
    return this.http.post(url, record).pipe(catchError(this.handleError));
  }

  private putAPI(url: string, record: any): Observable<any> {
    return this.http.put(url, record).pipe(catchError(this.handleError));
  }

  private deleteAPI(url: string, params: any): Observable<any> {
    return this.http.delete(url, params).pipe(catchError(this.handleError));
  }

  public addUser(record: any) {
    return this.postAPI(this.registerURL, record);
  }

  public login(record: any) {
    return this.postAPI(this.loginURL, record);
  }

  public getList(obj: ICalender) {
    let httpOptions: any = {};
    if (obj.month) {
      httpOptions["params"] = new HttpParams().set('type', obj.type.toLowerCase()).set('month', obj.month).set('year', obj.year);
    } else {
      httpOptions["params"] = new HttpParams().set('type', obj.type.toLowerCase());
    }
    return this.getAPI(this.listURL, httpOptions);
  }

  public addData(record: any) {
    return this.postAPI(this.sendURL, record);
  }

  public getEntry(data: any) {
    return this.postAPI(this.getURL, data);
  }

  public update(data: any) {
    return this.putAPI(this.updateURL, data);
  }

  // Credit card sextion
  public addCreditUse(record: any) {
    return this.postAPI(this.CreditcardAddURL, record);
  }

  public getCreditCardUse(date: any) {
    let httpOptions: any = {};
    httpOptions['params'] = new HttpParams().set('date', date);
    return this.getAPI(this.getCreditcarduseURL, httpOptions);
  }

  public getCreditCardPay(date: any) {
    let httpOptions: any = {};
    httpOptions['params'] = new HttpParams().set('date', date);
    return this.getAPI(this.getCreditcardpayURL, httpOptions);
  }

  public deleteCreditCardPay(date: any) {
    let httpOptions: any = {};
    httpOptions['params'] = new HttpParams().set('date', date);
    return this.deleteAPI(this.deletecreditcardPayURL, httpOptions);
  }

  public deleteCreditCardUse(data: any) {
    let httpOptions: any = {};
    httpOptions['params'] = new HttpParams().set('date', data.date).set("amount", data.amount);
    return this.deleteAPI(this.deletecreditcardUseURL, httpOptions);
  } 

  public updateCreditCardUse(data: any) {
    return this.putAPI(this.updatecreditcarduseURL, data);
  } 

  public addCreditPay(record: any) {
    return this.postAPI(this.creditcardPayURL, record);
  }

  public getCreditCardUsedList() {
    return this.getAPI(this.creditcardUsedListURL);
  }

  public getCreditCardPaysList() {
    return this.getAPI(this.creditcardPaysListURL);
  }

  // Error handling..
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    if (error.status == 400 || error.status == 401) {
      return throwError(() => error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
