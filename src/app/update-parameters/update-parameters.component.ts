import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import { Parameter } from "../shared/parameter";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-parameters',
  templateUrl: './update-parameters.component.html',
  styleUrls: ['./update-parameters.component.css']
})
export class UpdateParametersComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  form(){
    this.formdata = new FormGroup({
      threshold: new FormControl('')
    });
  }

  formdata;
  totally_empty = false;
  success = false;
  parameter;
  repeated_field = false;

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
    if(data.threshold === this.service.parameter_to_be_updated.threshold){
      this.totally_empty = false;
      this.success = false;
      this.repeated_field = true;
    }

    else{
      if(!(data.threshold === '')){
        this.service.parameter_to_be_updated.threshold = data.threshold;
      }
      this.totally_empty = false;
      this.success = true;
      this.repeated_field = false;
      this.form();
    }
    console.log(this.service.parameter)
  }


}
