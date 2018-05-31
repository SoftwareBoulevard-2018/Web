import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Question} from '../shared/question';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-analyst-q',
  templateUrl: './analyst-q.component.html',
  styleUrls: ['./analyst-q.component.css']
})
export class AnalystQComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  questions = [];
  questions2: MatTableDataSource<Question>;
  mensaje = false;

  table_titles = ['description', 'add'];

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.questions2 = new MatTableDataSource(this.questions);
      this.getAllAnalystQuestions();
      console.log(this.questions2);
    }
  }

  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.questions2.filter = filterValue;
  }

  redirect(event, element) {
	if(this.service.user_type === "Game Administrator"){
		this.service.analystQ.push(element);
		if (this.service.analystQ.length == this.service.project_to_assignate.numberOfDevelopingQuestionsPerAnalyst - 1) {
			this.mensaje = true;
		}
		var index = this.questions2.data.indexOf(element);
		this.questions2.data.splice(index,1);
		this.questions2 = new MatTableDataSource<Question>(this.questions2.data);

    }
  }
  
  redirect2() {
	// Redirects to New Instant project project
    if(this.service.user_type === "Game Administrator"){
      this.router.navigate(['home/set-up/create-project/developer-questions']);
    }
  }
  

  getAllAnalystQuestions(){
    return this.httpService.getQuestions().subscribe(data => this.listQuestions(data));
  }

  listQuestions(data){
    console.log(data);
    this.questions = [];
    for (const question of Object.values(data.data)) {
	 if (question.role == 'Analyst'){
      this.questions.push(question);
      this.questions2.data = this.questions;
      console.log(this.questions2);
     }
    }
  }



}

