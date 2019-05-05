import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { environment } from '../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
	providedIn: 'root'
})
export class FetchdataService {

	observer: Observer<any>;

	constructor() { }

	socket: any;

	getDataPoints(): Observable<any> {
		this.socket = socketIo(API_URL);

		this.socket.on('data', (res) => {
			this.observer.next(res.data);
		})
		return this.createObservable();
	}

	stopSession(): Observable<any> {
		this.socket.disconnect();
		return null;
	}

	createObservable() : Observable<number> {
		return new Observable(observer => {
			this.observer = observer;
		});
	}

	private handleError(error) {
		console.error('server error:', error);
		if (error.error instanceof Error) {
			let errMessage = error.error.message;
			return Observable.throw(errMessage);
		}
		return Observable.throw(error || 'Socket.io server error');
	}


}
