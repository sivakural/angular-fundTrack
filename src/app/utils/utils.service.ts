import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { user, expense, creditcardpay, creditcarduse, personaloan } from './utils';
import { AlertService } from '../common/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient, private alert: AlertService) { }

  private getAPI(url: string, params?: any): Observable<any> {
    if (params) {
      return this.http.get(url, { params: params }).pipe(catchError(this.handleError.bind(this)));
    } else {
      return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
    }
  }

  private postAPI(url: string, record: any): Observable<any> {
    return this.http.post(url, record).pipe(catchError(this.handleError.bind(this)));
  }

  private putAPI(url: string, record: any): Observable<any> {
    return this.http.put(url, record).pipe(catchError(this.handleError.bind(this)));
  }

  private deleteAPI(url: string, params: any): Observable<any> {
    return this.http.delete(url, { params: params }).pipe(catchError(this.handleError.bind(this)));
  }

  private getUrl(prefix: string, url: string) {
    switch (prefix) {
      case 'user':
        url = user[url];
        break;
      case 'expense':
        url = expense[url]
        break;
      case 'creditcardpay':
        url = creditcardpay[url]
        break;
      case 'personaloan':
        url = personaloan[url]
        break;
      default:
        url = creditcarduse[url]
        break;
    }
    return url;
  }

  public commonPost(record: any, prefix: string, url: string) {
    url = this.getUrl(prefix, url);
    return this.postAPI(url, record);
  }

  public commonGet(prefix: string, url: string, param?: any) {
    url = this.getUrl(prefix, url);
    return this.getAPI(url, param);
  }

  public commonPut(record: any, prefix: string, url: string) {
    url = this.getUrl(prefix, url);
    return this.putAPI(url, record);
  }

  public commonDelete(prefix: string, url: string, param: any) {
    url = this.getUrl(prefix, url);
    return this.deleteAPI(url, param);
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
      this.alert.triggerAlert(error.error);
      return throwError(() => error);
    }

    let stringMsg = 'Something bad happened; please try again later.';
    this.alert.triggerAlert(stringMsg);
    return throwError(() => new Error(stringMsg));
  }
}
