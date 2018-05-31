import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Question } from '../shared/question';
import { HttpService } from '../http.service';
import { Assignment } from '../shared/assignment';
import { BiddingProject } from '../shared/biddingProject';

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
  mensaje = false;
  assignment;

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

  createBiddingProject(project) {
    return this.httpService.createBiddingProject(project).subscribe(data => console.log(data));
  }

  createInstantProject(project){
    return this.httpService.createInstantProject(project).subscribe(data => console.log(data));
  }


  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.questions2.filter = filterValue;
  }

  redirect(event, element) {
    if (this.service.user_type === "Game Administrator") {
      this.service.testerQ.push(element);
      if (this.service.testerQ.length == this.service.project_to_assignate.numberOfDevelopingQuestionsPerTester - 1) {
        this.mensaje = true;
      }
      var index = this.questions2.data.indexOf(element);
      this.questions2.data.splice(index, 1);
      this.questions2 = new MatTableDataSource<Question>(this.questions2.data);

    }
  }

  getBiddingProject() {
    return this.httpService.getAllBiddingProjects().subscribe(data => this.recolect(data));
  }

  getInstantProject(project) {
    return this.httpService.getAllBiddingProjects().subscribe(data => this.recolect(data));
  }

  recolect(data) {
    console.log(data);
    for (const project of Object.values(data.data)) {
      if (project.name === this.service.project.name) {
        this.service.projectID = project.id;
        console.log(project);
      }
    }
  }

  createAssignment(preguntas, project) {

    for (var pregunta of preguntas) {
      this.assignment = new Assignment(project.id, pregunta._id, project.name, pregunta.description);
      this.createAssignment2(this.assignment);
    }
  }

  createAssignment2(ass) {
    return this.httpService.createAssignment(ass).subscribe(data => console.log(data));
  }

  redirect2() {
    if (this.service.user_type === "Game Administrator") {
      if(this.service.project instanceof BiddingProject){
        this.createBiddingProject(this.service.project);
      }
      else {
        this.createInstantProject(this.service.project);
      }
      this.getBiddingProject();
      this.createAssignment(this.service.analystQ, this.service.project);
      this.createAssignment(this.service.developerQ, this.service.project);
      this.createAssignment(this.service.testerQ, this.service.project);
      this.router.navigate(['home/set-up/']);
    }
  }


  getAllAnalystQuestions() {
    return this.httpService.getQuestions().subscribe(data => this.listQuestions(data));
  }

  listQuestions(data) {
    console.log(data);
    this.questions = [];
    for (const question of Object.values(data.data)) {
      if (question.role == 'Tester') {
        this.questions.push(question);
        this.questions2.data = this.questions;
        console.log(this.questions2);
      }
    }
  }
}
