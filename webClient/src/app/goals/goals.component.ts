import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';
import { LoginService } from '../login.service';


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

	constructor(private goalService: GoalService, private login: LoginService) { }

	ngOnInit() {
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
	getGoals() {
		this.goalService.getGoals()
			.subscribe(goals => this.goals = goals);
	}


}
