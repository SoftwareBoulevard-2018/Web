import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import { User } from "../shared/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  form(){
    this.formdata = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      confirmation: new FormControl(''),
      role: new FormControl('')
    });
  }

  new_username(username, current_username){
    if(username === current_username){
      return false;
    }
    for(let user of this.service.users){
      if(username === user.username){
        return false;
      }
    }
    return true;
  }

  formdata;
  invalid = false;
  success = false;
  totally_empty = false;
  flawed_username = false;
  repeated_field = false;
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
    this.auxiliar = this.new_username(data.username, this.service.user_to_be_updated.username);
    if(data.username === '' && data.name === '' && data.password === '' && (data.role === '' || data.role === undefined)){
      this.totally_empty = true;
      this.invalid = false;
      this.success = false;
      this.flawed_username = false;
      this.repeated_field = false;
    }
    else if(!(data.password === data.confirmation)){
      this.totally_empty = false;
      this.invalid = true;
      this.success = false;
      this.flawed_username = false;
      this.repeated_field = false;
    }
    else if(data.name === this.service.user_to_be_updated.name || data.username === this.service.user_to_be_updated.username
      || data.password === this.service.user_to_be_updated.password || data.role === this.service.user_to_be_updated.role){
      this.totally_empty = false;
      this.invalid = false;
      this.success = false;
      this.flawed_username = false;
      this.repeated_field = true;
    }
    else if(!(this.auxiliar)){
      this.totally_empty = false;
      this.invalid = false;
      this.success = false;
      this.flawed_username = true;
      this.repeated_field = false;
    }
    else{
      if(!(data.name === '')){
        this.service.user_to_be_updated.name = data.name;
      }
      if(!(data.username === '')){
        this.service.user_to_be_updated.username = data.username;
      }
      if(!(data.password === '')){
        this.service.user_to_be_updated.password = data.password;
      }
      if(!(data.role === '' || data.role === undefined)){
        this.service.user_to_be_updated.role = data.role;
      }
      this.totally_empty = false;
      this.invalid = false;
      this.success = true;
      this.flawed_username = false;
      this.repeated_field = false;
      this.form();
    }
    console.log(this.service.users)
  }

}
