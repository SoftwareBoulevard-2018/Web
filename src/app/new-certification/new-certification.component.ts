import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Question} from '../shared/question';
import {HttpService} from '../http.service';
import {creationCertification} from '../shared/creationCertification';

@Component({
  selector: 'app-new-certification',
  templateUrl: './new-certification.component.html',
  styleUrls: ['./new-certification.component.css']
})
export class NewCertificationComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
  
  questions = [];
  questions2: MatTableDataSource<Question>;
  questions3 = [];
  certification
  
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
		this.questions3.push(element._id);
		var index = this.questions2.data.indexOf(element);
		this.questions2.data.splice(index,1);
		this.questions2 = new MatTableDataSource<Question>(this.questions2.data);

    }
  }
  
  createCertification(certification){
	  return this.httpService.createCertification(certification).subscribe(data => console.log(data));
  }
  
  redirect2(event) {
	// Redirects to New Instant project project
	this.certification = new creationCertification(this.service.certlevel,this.service.certrole,this.questions3);
	this.createCertification(this.certification);
    if(this.service.user_type === "Game Administrator"){
      this.router.navigate(['home/set-up']);
	  
    }
  }
  
  getAllAnalystQuestions(){
    return this.httpService.getQuestions().subscribe(data => this.listQuestions(data));
  }

  listQuestions(data){
    console.log(data);
    this.questions = [];
    for (const question of Object.values(data.data)) {
	 if (question.role == this.service.certrole){
      this.questions.push(question);
      this.questions2.data = this.questions;
      console.log(this.questions2);
     }
    }
  }

}
