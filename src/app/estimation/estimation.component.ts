import { Component, OnInit } from '@angular/core';
import {GeneralServiceService} from '../general-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Company} from '../shared/company';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {
  guess;
  constructor(public service: GeneralServiceService, public router: Router) { }

  form(){
    this.guess = new FormGroup({
      cost: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      time: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    });
  }

  estimation_validation(guess){
    for(let company of this.service.companies){
      if(name === company.name){
        return false;
      }
    }
    return true;
  }

  onClickSubmit(data) {
    if(this.new_name(data.name)){
      this.service.companies.push(new Company(data.name,data.project_manager,data.img))
      this.invalid = false;
      this.success = true;
      this.possible_project_managers();
      this.form();
    }
    else{
      this.invalid = true;
      this.success = false;
    }
  }

  ngOnInit() {

  }

}
