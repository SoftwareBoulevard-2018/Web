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
  user;
  users2: MatTableDataSource<User>;
  users = [];
  auxiliar;
  invalid_name = false;
  newinvitation;
  state="unattended";
  xx=0;

  table_titles = [ 'name', 'username', 'role', 'company', 'invite'];

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
  // method for the correct function of the button
  ngOnInit() {
    // Transforms the data to the necessary format to be read by material tables
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Game Administrator' || this.service.user.companyId!== null) {
      this.router.navigate(['restricted']);
    } else {
      this.users2 = new MatTableDataSource(this.users);
      this.getAllUsers();
      console.log(this.users2);

    }
  }

  getAllUsers() {
    return this.httpService.getAllUsers().subscribe(data => this.listUser(data));
  }

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
        console.log(this.users2);
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
      console.log(this.users2);
    });
  }

  listUser(data) {
    console.log(data);
    this.users = [];
    for (const value of Object.values(data.data)) {
      this.getCompanyById(value.companyId, value);
    }
  }

  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }

  getInvitation(formdata){
    return this.httpService.getinvitationsByUserAndCompany(formdata.id, this.service.user.companyId).subscribe(data => {

        this.auxiliar = false;
        console.log(this.auxiliar)

      },
      error => {
        this.auxiliar = true;
        this.xx=this.xx+1;

        console.log(this.auxiliar);
        this.newinvitation= new invitations(formdata.id, this.service.user.companyId, this.state );

        this.createinvitation(this.newinvitation);
      });

  }





  createinvitation(inv) {
    return this.httpService.createinvitations(inv).subscribe(data => console.log(data));
  }

  onClickSubmit(data) {
    // Validates the data input on the form and if it's correct then creates the user
    // this.auxiliar = this.new_username(data.username);
    console.log(data);
    this.getInvitation(data);
  }
  }



