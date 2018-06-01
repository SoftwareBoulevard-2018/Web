import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {

  // These variables help to define the efficiency (performance) of the users and the style of the performance bar
  user;
  performance;
  color = 'primary';
  mode = 'determinate';

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    // This component defines the performance shown in the html based on the user that will be shown and on its role
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    this.getUserById(this.service.user_to_be_updated);

  }

  getUserById(userId) {
    return this.httpService.getUserById(userId).subscribe(data => { this.user = data;
    if (data.role === 'Project Manager') {
      this.getRightEstimations(data.username);
    } else {
      if ( this.user.resourcesSpent === 0 || (this.user.correctTrainingQuestions === 0
        && this.user.correctProjectQuestions === 0) ) {
        this.performance = 0;
      } else {
        this.performance = ((this.user.correctTrainingQuestions +
          this.user.correctProjectQuestions) / this.user.resourcesSpent) * 100;
      }
    }
      this.getCompanyById(data.companyId);
    });
  }

  getRightEstimations(PMusername) {
    this.httpService.getEstimationByProjectManagerUsernameAndState(PMusername, 'true').subscribe( data => {
      this.user.correctEstimations = data.length;
      this.getWrongEstimations(PMusername);
    });
  }

  getWrongEstimations(PMusername) {
    this.httpService.getEstimationByProjectManagerUsernameAndState(PMusername, 'false').subscribe( data => {
      this.user.wrongEstimations = data.length;
      if ( this.user.correctEstimations === 0 && this.user.wrongEstimations === 0) {
        this.performance = 0;
      } else {
        this.performance = ((this.user.correctEstimations) /
          (this.user.correctEstimations + this.user.wrongEstimations)) * 100;
      }
    });
  }

  getCompanyById(companyId) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      const fuck = JSON.parse(JSON.stringify(data));
      this.user.id = fuck.id;
      this.user.companyName = data.name;
      this.user.companyImage = data.image;
    }, error => {
      this.user.companyName = undefined;
      this.user.companyImage = undefined;
      }); }

  redirect(event) {
    this.router.navigate(['home/users/user-status/update']);
  }
  redirect2(event) {
    // redirects to company status defining the necessary data
    this.service.company_to_be_updated = this.user.id;
    this.router.navigate(['home/companies/company-status']);
  }
}
