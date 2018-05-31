import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {HttpService} from '../http.service';
import {Company} from '../shared/company';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})
export class JoinTeamComponent implements OnInit {
  company_pending;
  company_pending_name;
  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
    ngOnInit() {
      console.log(this.service.user_type);
      //this.httpService.getTrainingAttemptsByState("wrong").subscribe(data => this.print_data(data))

      this.httpService.getInvitationByUserAndState(this.service.user.id, "pending").subscribe(data => {
        this.company_pending = data[0]['company']
          this.httpService.getAllCompanies().subscribe(data => {
            Object.values(data).forEach(cosa=>{
              cosa.forEach(cosita => {
              if(cosita['id'] == this.company_pending){
                this.company_pending_name = cosita['name']
              }
            })
          })
        })
      })



      if (this.service.user_type === undefined) {
        this.router.navigate(['']);
      }
    }
    /*
    this.getDevelopingAttemptsByState('wrong');
      /*}
      *//*
    }

    getDevelopingAttemptsByState(state: string) {
      return this.httpService.getDevelopingAttemptsByState(state).subscribe(data => this.listDevelopingAttempts(data));
    }

    listDevelopingAttempts(data) {
      console.log(data);
      /*
      this.trainingAttempts = [];
      for (const value of Object.values(data.data)) {
        this.getUserByRoleCompany('Project Manager', value);
      }
      *//*
    }*/


    print_data(data){
      console.log(data)
    }
    //actualizar la base de datos cuando diga que shi o que no
    redirect1(event) {
      alert("You have joined!");

    }

    redirect2(event) {
      alert("You have reject!");
    }
}
