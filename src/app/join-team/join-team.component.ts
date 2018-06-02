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
  company_pending;
  company_pending_name;
  idInvitation;
  invite;
  image;
  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    console.log(this.service.user_type);

    this.httpService.getInvitationByUserAndState(this.service.user.id, "pending").subscribe(data => {
      this.invite = data[0]
      this.idInvitation = data[0]['_id']
      this.company_pending = data[0]['company']
        this.httpService.getAllCompanies().subscribe(data => {
          Object.values(data).forEach(cosa=>{
            cosa.forEach(cosita => {
            if(cosita['id'] == this.company_pending){
              this.company_pending_name = cosita['name']
              this.image = cosita['image']
            }
          })
        })
      })
    })

    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
  }

  print_data(data){
    console.log(data)
  }

  redirect1(event) {
    console.log(this.idInvitation)
    this.invite.state = 'accepted'
    this.httpService.updateInvitation(this.invite, this.idInvitation).subscribe(data => {
      console.log(data)
    });
    this.service.user.companyId = this.company_pending;
    this.httpService.updateUser(this.service.user, this.service.user.id).subscribe(data => {
      console.log(data)
    });
    alert("You have joined!");
  }
  redirect2(event) {
    this.invite.state = 'rejected'
    //No sirve
    this.httpService.updateInvitation(this.invite, this.idInvitation).subscribe(data => {});
    alert("You have reject!");
  }
}
