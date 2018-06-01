import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {HttpService} from '../http.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})
export class JoinTeamComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    console.log(this.service.user_type);
    this.httpService.getTrainingAttemptsByState("wrong").subscribe(data => this.print_data(data))

    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
  }

  print_data(data){
    console.log(data)
  }

  redirect1(event) {
    alert("You have joined!");
  }

  redirect2(event) {
    alert("You have reject!");
  }

}
