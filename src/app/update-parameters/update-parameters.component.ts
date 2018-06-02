import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-update-parameters',
  templateUrl: './update-parameters.component.html',
  styleUrls: ['./update-parameters.component.css']
})
export class UpdateParametersComponent implements OnInit {

  // These variables are used to create the forms and validate the data input on them
  user_to_be_updated;
  formdata;
  success = false;
  parameter;
  repeated_field = false;
  range = false;

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  form() {
    // Defines the default state of the forms
    this.formdata = new FormGroup({
      threshold: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    });
    this.getGameAdministrator();
  }


  ngOnInit() {
    // Checks User permissions and establishes the form in the default state
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

  getGameAdministrator() {
    return this.httpService.getUsersByRole('Game Administrator').subscribe(data =>
      this.user_to_be_updated = data[0]);
  }

  onClickSubmit(data) {
    // Validates the data input on the form and if it's correct then updates the parameters
    if (data.threshold <= 0.01 || data.threshold >= 0.99) {
      this.range = true;
      this.success = false;
      this.repeated_field = false;
    }
    else if (data.threshold === this.user_to_be_updated.threshold) {
      this.range = false;
      this.success = false;
      this.repeated_field = true;
    }
    else {
      this.range = false;
      this.repeated_field = false;
      this.success = true;
      this.user_to_be_updated.threshold = data.threshold;
      this.httpService.updateUser(this.user_to_be_updated, this.user_to_be_updated.id).subscribe(data => console.log(data));
    }
  }


}
