import { Component, OnInit } from '@angular/core';
import { GoalService } from '../goal.service';
import { MessageService } from '../message.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Goal } from '../goal';


@Component({
	selector: 'app-goal-details',
	templateUrl: './goal-details.component.html',
	styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute, private location: Location, private goalService: GoalService, private messageService: MessageService) { }

	goal: Goal;

	ngOnInit() {
		this.getHero();
	}

	getHero(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.goalService.getGoal(id).subscribe(goal => {
			this.log(`got goal '${goal.name}'`);
			this.goal = goal;
		}, err => this.log(`error getting goal: (${err})`))
	}

	private log(message: string) {
		this.messageService.add(`goal-details: ${message}`);
	}


	save(): void {
		console.log(`updating with goal ${this.goal.desc}`);
		this.goalService.updateGoal(this.goal)
			.subscribe(() => this.goBack());
	}


	goBack(): void {
		this.location.back();
	}

}
