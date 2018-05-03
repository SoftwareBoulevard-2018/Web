import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {

  }

  homeSubmit() {
    if(this.service.user_type === "Game Administrator"){
      this.router.navigate([''])
    }
    else if(this.service.user_type === "Project Manager"){
      this.router.navigate([''])
    }
    else if(this.service.user_type === "Team Member"){
      this.router.navigate([''])
    }
    else{
      this.router.navigate(['\'\', \'component'])
    }
  }

}
