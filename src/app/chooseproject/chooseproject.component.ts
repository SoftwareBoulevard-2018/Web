import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../shared/user";
import { MatSelect } from "@angular/material";

@Component({
  selector: 'app-chooseproject',
  templateUrl: './chooseproject.component.html',
  styleUrls: ['./chooseproject.component.css']
})
export class ChooseprojectComponent implements OnInit {
  ngOnInit(){

  }
  /*form(){
    this.formdata = new FormGroup({
      project: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    });
  }

  constructor(public service: GeneralServiceService, public router: Router) { }

  formdata;
  invalid = false;
  success = false;
  flawed_username = false;
  hide = true;
  roles = [ "Project Manager", "Analyst", "Developer", "Tester"];
  user;
  auxiliar;

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member") {
      this.router.navigate(['restricted'])
    }

    else {
      this.form();
    }
  }

  onClickSubmit(data) {
    this.auxiliar = this.new_username(data.username);
    if(data.password === data.confirmation && this.auxiliar) {
      this.user = new User(data.name, data.username, data.password, data.role);
      this.service.users.push(this.user);
      console.log(this.service.users);
      this.form();
      this.invalid = false;
      this.success = true;
      this.flawed_username = false;
    }
    else if(!(this.auxiliar)){
      this.invalid = false;
      this.success = false;
      this.flawed_username = true;
    }
    else{
      this.invalid = true;
      this.success = false;
      this.flawed_username = false;
    }
  }*/

}
