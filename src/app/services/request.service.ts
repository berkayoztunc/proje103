import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import { StoreService } from './store.service';


@Injectable({ providedIn: 'root' })
export class RequestService {
  error = null;
  domain = 'http://192.168.1.24:9201/';
  onTheGo = false;

  constructor(
    private http: HttpClient, private storage: StoreService) { }

  /** GET heroes from the server */
  get(url, params = null): Observable<any> {
    this.onTheGo = true;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        'Access-Control-Allow-Headers': '*',
        "authorization": this.storage.auth.token
      }),
      params: params,
    };
    return this.http.get(this.domain + url, options).pipe(
      tap(_ => this.onTheGo = false),
      catchError(this.handleError<any>('get'))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  post(url, param): Observable<any> {
    this.onTheGo = true;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Headers': '*',
        authorization: this.storage.auth ? this.storage.auth.token : null
      }),
    };
    return this.http.post(this.domain + url, param, options).pipe(
      tap(_ => this.onTheGo = false),
      catchError(this.handleError<any>('post'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete(url): Observable<any> {
    this.onTheGo = true;
    const headerObj = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Headers': '*',
        authorization: this.storage.auth ? this.storage.auth.token : null
      }),
    };
    return this.http.delete(this.domain + url, headerObj).pipe(
      tap(_ => this.onTheGo = false),
      catchError(this.handleError<any>('delete'))
    );
  }

  /** PUT: update the hero on the server */
  update(url, params): Observable<any> {
    this.onTheGo = true;
    const headerObj = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Headers': '*',
        authorization: this.storage.auth ? this.storage.auth.token : null
      }),
    };
    return this.http.put(this.domain + url, params, headerObj).pipe(
      tap(_ => this.onTheGo = false),
      catchError(this.handleError<any>('update'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.onTheGo = false
      if (error.error) {
        if (error.error.condition == 2010) {
          this.error = error.error.message
        } else if (error.error.condition == 2020) {
          Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
          })
        }
      }

      if (error.status == 400) {
        this.error = error.error.message
      } else {
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
        })
      }

      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    console.log(message)
  }
}
