import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Question } from '../shared/question';
import { HttpService } from '../http.service';
import { Assignment } from '../shared/assignment';

@Component({
  selector: 'app-tester-q',
  templateUrl: './tester-q.component.html',
  styleUrls: ['./tester-q.component.css']
})
export class TesterQComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  questions = [];
  questions2: MatTableDataSource<Question>;
  questions3: MatTableDataSource<Question>;
  vacio = false;
  maximo = true;
  project;
  assignment;

  table_titles = ['description', 'add'];
  table_titles2 = ['description', 'remove'];

  ngOnInit() {
    this.vacio = false;
    this.maximo = true;
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.questions2 = new MatTableDataSource(this.questions);
      this.questions3 = new MatTableDataSource(this.questions);
      this.getAllAnalystQuestions();
    }
  }


  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.questions2.filter = filterValue;
  }

  applyFilter2(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.questions3.filter = filterValue;
  }


  redirect(event, element) {
    if (this.service.user_type === "Game Administrator") {
      this.vacio = true;
      this.questions3.data.push(element);
      this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
      this.service.testerQ.push(element);
      var index = this.questions2.data.indexOf(element);
      this.questions2.data.splice(index, 1);
      this.questions2 = new MatTableDataSource<Question>(this.questions2.data);
      if (this.questions3.data.length === this.service.numTester) {
        this.maximo = false;
      }
    }
  }



  getProject(name) {
    return this.httpService.getInstantprojectByName(name);
  }


  createAssignment(preguntas, project) {
    for (var pregunta of preguntas) {
      if (!(pregunta === 'unasigned')) {
        this.assignment = new Assignment(project._id, pregunta._id);
        this.createAssignment2(this.assignment);
      }
    }
  }

  createAssignment2(ass) {
    return this.httpService.createAssignment(ass).subscribe(data => console.log(data));
  }


  redirect2(event) {
    if (this.service.user_type === "Game Administrator") {
      this.getProject(this.service.project.name).subscribe(data => {
        this.createAssignment(this.service.developerQ, data);
        this.createAssignment(this.service.analystQ, data);
        this.createAssignment(this.service.testerQ, data);
      });
      this.router.navigate(['home/set-up/']);
    }
  }

  redirect3(event, element) {
    if (this.service.user_type === "Game Administrator") {
      this.questions2.data.push(element);
      this.questions2 = new MatTableDataSource<Question>(this.questions2.data);
      var index = this.questions3.data.indexOf(element);
      var index2 = this.service.testerQ.indexOf(element);
      this.service.testerQ.splice(index2, 1);
      this.questions3.data.splice(index, 1);
      this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
      if (this.questions3.data.length === 0) {
        this.vacio = false;
      }
      this.maximo = true;
    }
  }


  getAllAnalystQuestions() {
    return this.httpService.getQuestions().subscribe(data => this.listQuestions(data));
  }

  listQuestions(data) {
    this.questions = [];
    for (const question of Object.values(data.data)) {
      if (question.role == 'Tester') {
        this.questions.push(question);
        this.questions2.data = this.questions;
      }
    }
  }
}
