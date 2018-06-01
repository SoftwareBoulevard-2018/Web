import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {Answer} from '../shared/answer';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-play-develop',
  templateUrl: './play-develop.component.html',
  styleUrls: ['./play-develop.component.css']
})
export class PlayDevelopComponent implements OnInit {
  current_company;
  correct;
  control: Answer;
  quest;

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else {
      console.log('aca');
      this.getCompanyById(this.service.company_to_be_updated);

    }
  }

  getCompanyById(companyId) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      this.current_company = data;
      this.showcompany();
    });
  }
  showcompany() {
    console.log(this.current_company);
  }

}
function  obtain_correct(Quest_n) {
  for (const correct of Quest_n.questions) {
    if ( correct.state === true ) {
      return correct;
    }
  }
}
