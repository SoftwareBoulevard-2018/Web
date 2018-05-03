import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../shared/user";
import { MatSelect } from "@angular/material";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  form(){
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      username: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      password: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      confirmation: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      role: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    });
  }

  new_username(username){
    for(let user of this.service.users){
      if(username === user.username){
        return false;
      }
    }
    return true;
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

   else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
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
  }

}
