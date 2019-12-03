import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.heroesUrl = 'api/users'; // URL to web api
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
    /** GET heroes from the server */
    getUseres() {
        return this.http.get(this.heroesUrl)
            .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError('getUseres', [])));
    }
    /** GET hero by id. Return `undefined` when id not found */
    getUserNo404(id) {
        const url = `${this.heroesUrl}/?id=${id}`;
        return this.http.get(url)
            .pipe(map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} hero id=${id}`);
        }), catchError(this.handleError(`getUser id=${id}`)));
    }
    /** GET hero by id. Will 404 if id not found */
    getUser(USER_ID) {
        const url = `${this.heroesUrl}/${USER_ID}`;
        return this.http.get(url).pipe(tap(_ => this.log(`fetched hero id=${USER_ID}`)), catchError(this.handleError(`getUser id=${USER_ID}`)));
    }
    /* GET heroes whose name contains search term */
    searchUseres(term) {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get(`${this.heroesUrl}/?name=${term}`).pipe(tap(_ => this.log(`found heroes matching "${term}"`)), catchError(this.handleError('searchUseres', [])));
    }
    //////// Save methods //////////
    /** POST: add a new hero to the server */
    addUser(hero) {
        return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(tap((newUser) => this.log(`added hero w/ id=${newUser.USER_ID}`)), catchError(this.handleError('addUser')));
    }
    /** DELETE: delete the hero from the server */
    deleteUser(hero) {
        const id = typeof hero === 'number' ? hero : hero.USER_ID;
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, this.httpOptions).pipe(tap(_ => this.log(`deleted hero id=${id}`)), catchError(this.handleError('deleteUser')));
    }
    /** PUT: update the hero on the server */
    updateUser(hero) {
        return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(tap(_ => this.log(`updated hero id=${hero.USER_ID}`)), catchError(this.handleError('updateUser')));
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError(operation = 'operation', result) {
        return (error) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
    /** Log a UserService message with the MessageService */
    log(message) {
    }
};
UserService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map