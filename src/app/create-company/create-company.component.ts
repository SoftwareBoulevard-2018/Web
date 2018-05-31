import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../shared/company';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  // Variables necessary for the fucntionality of the forms and the data input validations
  formdata;
  project_managers;
  invalid_url = false;
  success = false;
  user;

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  form() {
    // Defines the default state of the form
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      img: new FormControl(''),
      project_manager: new FormControl('')
    });
    this.getUserByRoleCompany('Project Manager', null);
  }

  getUserByRoleCompany(role, companyId) {
    return this.httpService.getUserByRoleCompany(role, companyId).subscribe( data => {
        console.log(data);
      if (Array.isArray(data)) {
        this.project_managers = data;
      } else {
        this.project_managers = [data];
      }
      console.log(this.project_managers);
    }, error => {
      this.project_managers = [];
      }
    );
}

  ngOnInit() {
    // Defines the available project managers and puts the form in default state
    if (this.service.user_type === undefined) {
       this.router.navigate(['']);
     } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
       this.router.navigate(['restricted']);
     } else {
      this.form();
    }
  }

  onClickSubmit(data) {
    // Makes distinct validations
    if ((!(data.img.substring(0, 4) === 'http') || (!(data.img.substring(data.img.length - 3) === 'jpg')
      && !(data.img.substring(data.img.length - 3) === 'png'))) && !(data.img === '')) {
      this.invalid_url = true;
      this.success = false;
    } else {
      // this.service.companies.push(new Company(data.name, this.search_modify_user(data.project_manager, data.name), data.img));
      this.createCompany(data);
      this.invalid_url = false;
      this.success = true;
    }
  }

  createCompany(formdata) {
    return this.httpService.createCompany(new Company(formdata.name, formdata.img)).subscribe( data => {
      this.updateUser({ companyId: data.id }, formdata.project_manager);
    });
  }

  updateUser(user, userId) {
    return this.httpService.updateUser(user, userId).subscribe(data => {
        console.log('success');
        this.form();
      }
    );
  }

}
