import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Goal } from './goal';

@Injectable({
	providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const goals = [
			this.makeGoal(1, 'Run 5 times a week', 'foo foo foo'),
			this.makeGoal(2, 'Write blog articles', '2 blog posts per month'),
			this.makeGoal(3, 'Work on app'),
		];
		return { goals }; // returns an object with the "goals" property set to goals
	}

	private makeGoal(id: number, name: string, desc: string = ''): Goal {
		return { id: id, name: name, desc: desc };
	}

	// Overrides the genId method to ensure that a hero always has an id.
	// If the heroes array is empty,
	// the method below returns the initial number (11).
	// if the heroes array is not empty, the method below returns the highest
	// hero id + 1.
	genId(goals: Goal[]): number {
		return goals.length > 0 ? Math.max(...goals.map(goal => goal.id)) + 1 : 11;
	}
}