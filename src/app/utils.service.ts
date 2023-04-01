import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ICalender } from './utils';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  host = "https://fundtrack.onrender.com";
  // host = 'http://192.168.1.5:8080'
  sendURL = this.host + "/entry";
  listURL = this.host + "/tracklist";
  getURL = this.host + "/getentry";
  updateURL = this.host + "/update";
  registerURL = this.host + "/register";
  loginURL = this.host + '/login';

  // Credit card
  CreditcardAddURL = this.host + '/creditcarduse';
  creditcardPayURL = this.host + '/creditcardpay';
  getCreditcarduseURL = this.host + '/getcreditcarduse';
  getCreditcardpayURL = this.host + '/getcreditcardpay';
  creditcardUsedListURL = this.host + '/getCreditCardUsedlist';
  creditcardPaysListURL = this.host + '/getCreditCardPayslist';
  deletecreditcardPayURL = this.host + '/deletecreditcardpay';
  deletecreditcardUseURL = this.host + '/deletecreditcarduse';
  updatecreditcarduseURL = this.host + '/creditcarduseupdate';

  httpOptions: any = {};

  constructor(private http: HttpClient) { }

  public addUser(record: any): Observable<any> {
    return this.http.post(this.registerURL, record).pipe(catchError(this.handleError));
  }

  public login(record: any): Observable<any> {
    return this.http.post(this.loginURL, record).pipe(catchError(this.handleError));
  }

  public getList(obj: ICalender): Observable<any> {
    if (obj.month) {
      this.httpOptions["params"] = new HttpParams().set('type', obj.type.toLowerCase()).set('month', obj.month).set('year', obj.year);
    } else {
      this.httpOptions["params"] = new HttpParams().set('type', obj.type.toLowerCase());
    }
    return this.http.get(this.listURL, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  public addData(record: any): Observable<any> {
    return this.http.post(this.sendURL, record).pipe(
      catchError(this.handleError)
    )
  }

  public getEntry(data: any): Observable<any> {
    return this.http.post(this.getURL, data).pipe(
      catchError(this.handleError)
    )
  }

  public update(data: any): Observable<any> {
    return this.http.put(this.updateURL, data).pipe(
      catchError(this.handleError)
    )
  }

  // Credit card sextion
  public addCreditUse(record: any): Observable<any> {
    return this.http.post(this.CreditcardAddURL, record).pipe(
      catchError(this.handleError)
    )
  }

  public getCreditCardUse(date: any): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('date', date);
    return this.http.get(this.getCreditcarduseURL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getCreditCardPay(date: any): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('date', date);
    return this.http.get(this.getCreditcardpayURL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteCreditCardPay(date: any): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('date', date);
    return this.http.delete(this.deletecreditcardPayURL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteCreditCardUse(data: any): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('date', data.date).set("amount", data.amount);
    return this.http.delete(this.deletecreditcardUseURL, this.httpOptions).pipe(catchError(this.handleError));
  } 

  public updateCreditCardUse(data: any): Observable<any> {
    return this.http.put(this.updatecreditcarduseURL, data).pipe(catchError(this.handleError));
  } 

  public addCreditPay(record: any): Observable<any> {
    return this.http.post(this.creditcardPayURL, record).pipe(
      catchError(this.handleError)
    )
  }

  public getCreditCardUsedList(): Observable<any> {
    return this.http.get(this.creditcardUsedListURL).pipe(catchError(this.handleError));
  }

  public getCreditCardPaysList(): Observable<any> {
    return this.http.get(this.creditcardPaysListURL).pipe(catchError(this.handleError));
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
