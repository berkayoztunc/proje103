import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { StoreService } from './store.service';


@Injectable({ providedIn: 'root' })
export class RequestService {
  error = null;
  //domain = 'http://192.168.116.206:9201/';
  //domain = 'http://192.168.118.210:9201/';
  //domain = 'http://172.16.3.10:80/';
  domain = window.location.origin + '/';
  //domain = 'http://192.168.43.211:9201/';
  onTheGo = false;
  systemError = new Subject();
  constructor(
    private http: HttpClient, public storage: StoreService) { }

  /** GET heroes from the server */
  get(url, params = null): Observable<any> {
    this.onTheGo = true;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Headers': '*',
        authorization: this.storage.auth.token
      }),
      params,
    };
    return this.http.get(this.domain + url, options).pipe(
      tap(_ => this.onTheGo =  false),
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
      tap(_ => this.onTheGo =  false),
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
      tap(_ => this.onTheGo =  false),
      catchError(this.handleError<any>('delete'))
    );
  }

  /** PUT: update the hero on the server */
  update(url, params): Observable<any> {
    this.onTheGo = true;
    const headerObj = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': '*',
        authorization: this.storage.auth ? this.storage.auth.token : null
      }),
    };
    return this.http.put(this.domain + url, params, headerObj).pipe(
      tap(_ => this.onTheGo =  false),
      catchError(this.handleError<any>('update'))
    );
  }
  uploadPost(url, params):Observable<any>{

    let formData = new FormData();
    
    formData.append('FILE', params.file);
    formData.append('FILE_NAME', params.file_name);
    formData.append('BATCH_TYPE' ,params.file_type);    
    this.onTheGo = true;
    const headerObj = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': '*',
        authorization: this.storage.auth ? this.storage.auth.token : null
      }),
    };
    return this.http.post(this.domain +url, formData, headerObj).pipe(
      tap(_ => this.onTheGo =  false),
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
      this.onTheGo = false;
      const status = error.status;
      console.log(status,error);
    
      switch (status) {
        case 404:
            Swal.fire({
              title: 'Not found',
              text: error.message,
              icon: 'info',
            });
            break;
        case 400:
            if(error.error.condition){
              this.error = error.error.message;
            }else{
              this.error = "M-4000" // burası langlı değil
            }
            break;
        case 403:
            Swal.fire({
              title: 'Auth!',
              text: error.message,
              icon: 'warning',
            });
            break;
        default:
            this.condidationError(error.error);
            break;
      }

      return of(result as T);
    };
  }
  private condidationError(error) {

    switch (error.condition) {
      case 2010:
        this.error = error.message;
        break;
      case 2020:
          this.error = Object.assign({}, error);
          this.systemError.next(error);
          break;
      default:
        break;
    }
  }
 
}
