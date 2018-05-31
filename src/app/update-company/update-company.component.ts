import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {Company} from '../shared/company';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  // Variables necessary to the form's functionalit and the data input validations
  formdata;
  current_company;
  project_managers;
  invalid_url = false;
  lacking_project_manager = false;
  totally_empty = false;
  invalid_name = false;
  success = false;
  repeated_field = false;
  hide = true;
  user;

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  form() {
    // Establishes the form's default state
    this.formdata = new FormGroup({
      name: new FormControl(''),
      img: new FormControl(''),
      project_manager: new FormControl('')
    });
    this.getCompanyById(this.service.company_to_be_updated);
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

  getCompanyById(companyId) {
    return this.httpService.getCompanyById(companyId).subscribe( data => {
      this.current_company = data;
      this.getCurrentProjectManager('Project Manager', companyId);
      });
  }

  getCurrentProjectManager(role, companyId) {
    return this.httpService.getUserByRoleCompany(role, companyId).subscribe( data => {
        if (data[0] === undefined) {
          this.lacking_project_manager = true;
          this.getUserByRoleCompany('Project Manager', null);
        } else {
          this.lacking_project_manager = false;
        }
      }
    );
  }

  ngOnInit() {
    // Defines if there is a project manager in the company, the currently
    // available project managers and establishes the form in its default state
    if (this.service.user_type === undefined) {
       this.router.navigate(['']);
     } else if (this.service.user_type === 'Team Member') {
       this.router.navigate(['restricted']);
     } else {
      this.form();
    }
  }

  onClickSubmit(data) {
    // Validates the data input and if it's valid updates the company and its members
    if (data.name === '' && data.img === '' &&
      (!(this.lacking_project_manager) || data.project_manager === '' || data.project_manager === undefined)) {
      this.invalid_url = false;
      this.invalid_name = false;
      this.totally_empty = true;
      this.success = false;
      this.repeated_field = false;
    } else if ((!(data.img.substring(0, 4) === 'http') || (!(data.img.substring(data.img.length - 3) === 'jpg')
     && !(data.img.substring(data.img.length - 3) === 'png'))) && !(data.img === '')) {
      this.invalid_url = true;
      this.invalid_name = false;
      this.totally_empty = false;
      this.success = false;
      this.repeated_field = false;
    } else if (data.name === this.service.company_to_be_updated.name || data.img === this.service.company_to_be_updated.image) {
      this.invalid_url = false;
      this.invalid_name = false;
      this.totally_empty = false;
      this.success = false;
      this.repeated_field = true;
    } else {
        if (!(data.name === '')) {
          this.updateName(data.name);
        }
        if (!(data.img === '')) {
          this.updateImage(data.img);
        }
        if (!(data.project_manager === '' || data.project_manager === undefined || !(this.lacking_project_manager))) {
          this.updateUser({ companyId: this.service.company_to_be_updated }, data.project_manager);
        }
      this.invalid_url = false;
      this.invalid_name = false;
      this.totally_empty = false;
      this.success = true;
      this.repeated_field = false;
    }
  }

  updateName(newName) {
    return this.httpService.updateCompany({ name: newName }, this.service.company_to_be_updated).subscribe( data => {
      console.log('success');
      this.form();
    });
  }

  updateImage(newImage) {
    return this.httpService.updateCompany({ image: newImage }, this.service.company_to_be_updated).subscribe( data => {
      console.log('success');
      this.form();
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
