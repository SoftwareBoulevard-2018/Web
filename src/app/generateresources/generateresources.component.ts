import { Component, OnInit } from '@angular/core';
import {BiddingProject} from '../shared/biddingProject';
import {GeneralServiceService} from '../general-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-generateresources',
  templateUrl: './generateresources.component.html',
  styleUrls: ['./generateresources.component.css']
})
export class GenerateresourcesComponent implements OnInit {

  solved_puzzle = false;
  redirect1($event) {
    this.solved_puzzle = true;
  }
  constructor(public service: GeneralServiceService, public router: Router) {
  }

  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    else if (this.service.user_type === "Team Member") {
      this.router.navigate(['restricted']);
    }
  }

}


