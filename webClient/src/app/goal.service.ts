import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { Goal } from './goal';

import { MessageService } from './message.service';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class GoalService {
	constructor(private http: HttpClient, private messageService: MessageService) { }


	private goalsUrl = 'api/goals';  // URL to web api
	private apiUrl = 'api/';

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	getGoals(): Observable<Goal[]> {
		// TODO: send the message _after_ fetching goals
		this.messageService.add('GoalService: fetched goals');
		return this.http.get<Goal[]>(this.goalsUrl);
	}
	getGoal(id: number): Observable<Goal> {
		this.log(`getGoal(${id}) called`);
		const url = `${this.goalsUrl}/${id}`;
		return this.http.get<Goal>(url)
	}
	addGoal(goal: Goal): Observable<Goal> {
		return this.http.post(this.goalsUrl, goal, { 'responseType': 'text' }).pipe(
			tap((resp: Goal) => console.log("got resp: ", resp, "type: ", typeof (resp))),
			tap((newGoal: Goal) => this.log(`added hero w/ id=${newGoal.id}`))
		);
	}
	deleteGoal(goal: Goal | number): Observable<Goal> {
		const id = typeof goal === 'number' ? goal : goal.id;
		const url = `${this.goalsUrl}/${id}`;

		return this.http.delete<Goal>(url, this.httpOptions).pipe(
			tap(_ => this.log(`deleted hero id=${id}`))
		);
	}
	updateGoal(goal: Goal) {
		return this.http.put(this.goalsUrl, goal, this.httpOptions).pipe(
			tap(_ => this.log(`updated goal id=${goal.id}`)));
	}


	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	private log(message: string) {
		this.messageService.add(`GoalService: ${message}`);
	}

	pingAPI() {
		console.log("Pinging API");
		this.http.get<Goal[]>(this.goalsUrl).subscribe(goals => {
			for (let goal of goals) {
				console.log(goal);
			}
		});
	}

}
