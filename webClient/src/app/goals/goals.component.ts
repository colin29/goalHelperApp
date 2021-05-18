import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';
import { LoginService } from '../login.service';
import { NotLoggedInError } from '../login.service';

import { ChangeDetectorRef } from '@angular/core';






/*
	The goals component simply displays a list of all goals
	*/

@Component({
	selector: 'app-goals',
	templateUrl: './goals.component.html',
	styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

	goals: Goal[];
	isExpanded: Map<Goal, boolean> = new Map();

	constructor(private goalService: GoalService, private login: LoginService, private changeDetector: ChangeDetectorRef) { }

	ngOnInit() {
		this.login.currentUser$.subscribe((user) => {
			console.log("goals.component detected change in user", user);
			if (user) {
				console.log("goals.component detected login")
				this.fetchGoalsAndUpdate();
			} else {
				// this.goals = [];
			}
		}
	}

	toggleExpanded(goal: Goal) {
		this.isExpanded.set(goal, !this.isExpanded.get(goal));
		console.log(`${goal.name} expanded=${this.isExpanded.get(goal)}`);
	}

	addGoal(name: string, desc: string) {
		let g = { name: name, desc: desc }
		this.goalService.addGoal(g as Goal).subscribe(goal => {
			this.goals.push(goal);
		});
	}
	deleteGoal(goal: Goal) {
		this.goals = this.goals.filter(g => g !== goal);
		this.goalService.deleteGoal(goal).subscribe();
	}
	fetchGoalsAndUpdate() {

		try {
			this.goalService.getGoals()
				.subscribe(goals => {
					this.goals = goals
					console.log("Goals:", this.goals);
					this.changeDetector.detectChanges();
				},
					reason => console.log("Failed to get goals", reason));
		} catch (error: NotLoggedInError) {
			// No special handling needed.
		}

	}




}
