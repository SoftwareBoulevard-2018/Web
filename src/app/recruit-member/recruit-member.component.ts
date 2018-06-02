import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from '../shared/company';
import {HttpService} from "../http.service";
import { User } from '../shared/user';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {invitations} from "../shared/invitations";


@Component({
  selector: 'app-recruit-member',
  templateUrl: './recruit-member.component.html',
  styleUrls: ['./recruit-member.component.css']
})
export class RecruitMemberComponent implements OnInit {
  formdata;
  invalid = false;
  success = false;
  load_complete = false;
  user;
  users2: MatTableDataSource<User>;
  users = [];
  auxiliar;
  invalid_name = false;
  newinvitation;
  state="pending";
  xx=0;

  table_titles = [ 'name', 'username', 'role', 'company', 'invite'];

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
  // main operation
  ngOnInit() {
    // Transforms the data to the necessary format to be read by material tables
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Game Administrator') {
      this.router.navigate(['restricted']);
    } else {
      this.users2 = new MatTableDataSource(this.users);
      this.getAllUsers();

    }
  }

  //check if you have company
  haveCompany() {
    if (this.service.user.companyId === null){
      return false;
    } else {
      return true;
    }
  }

  //function that brings all the users of the database
  getAllUsers() {
    return this.httpService.getAllUsers().subscribe(data => {
      this.listUser(data);
      this.load_complete = true;
    });
  }

  // functionality of the exit button
  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  //function that searches for a company id and brings it from the database
  getCompanyById(companyId, user) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      user.companyName = data.name;
      user.hide_password = true;
      if(user.companyName===undefined && user.role!=='Game Administrator' && user.role!=='Project Manager') {
        this.users.push({
          id: user.id, createdAt: user.createdAt,
          name: user.name, username: user.username,
          password: user.password, role: user.role, companyName: user.companyName,
          hide_password: true
        });
        this.users2.data = this.users;
      }
    }, error => {
      if(user.companyName===undefined && user.role!=='Game Administrator' && user.role!=='Project Manager') {
      user.companyName = undefined;
      user.hide_password = true;


        this.users.push({
          id: user.id,
          name: user.name, username: user.username,
          role: user.role, companyName: user.companyName,
          hide_password: true
        });
        this.users2.data = this.users;
      }
    });
  }

  //Stores the users in a list
  listUser(data) {
    this.users = [];
    for (const value of Object.values(data.data)) {
      this.getCompanyById(value.companyId, value);
    }
  }

  //filter functionality
  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }

  //send invitation to the selected users
  getInvitation(formdata){
    return this.httpService.getinvitationsByUserAndCompany(formdata.id, this.service.user.companyId).subscribe(data => {

        this.auxiliar = false;

      },
      error => {
        this.auxiliar = true;
        this.xx=this.xx+1;

        this.newinvitation= new invitations(formdata.id, this.service.user.companyId, this.state );

        this.createinvitation(this.newinvitation);
        alert("Invitation has been sent correctly!");
      });

  }

  //create the invitation on the database
  createinvitation(inv) {
    return this.httpService.createinvitations(inv).subscribe(data => {},error => {});
  }

  //Validates the data input on the form and if it's correct then creates the user
  onClickSubmit(data) {
    this.getInvitation(data);
  }
}
