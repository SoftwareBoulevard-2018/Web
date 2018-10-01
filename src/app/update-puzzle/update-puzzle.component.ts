import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatSelect } from "@angular/material";
import {HttpService} from '../http.service';
import { creationPuzzle } from '../shared/creationPuzzle';

@Component({
  selector: 'app-update-puzzle',
  templateUrl: './update-puzzle.component.html',
  styleUrls: ['./update-puzzle.component.css']
})
export class UpdatePuzzleComponent implements OnInit {
	
   url = this.service.puzzle_to_be_updated.originalmage;
  formdata;
  puzzle;
  filename;
  success;


  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
  
  form(){
    this.formdata = new FormGroup({
      resources: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  file: new FormControl(''),
    });
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
   
  
  updatePuzzle(puzzle){
	  return this.httpService.updatePuzzle(puzzle,puzzle._id).subscribe( data => console.log(data));
  }
  
  
  onClickSubmit(data){
	  var a = { _id: this.service.puzzle_to_be_updated._id, rewarded_resources: data.resources};
	  this.updatePuzzle(a);	  
	  this.form();
	  this.success = true;
  } 
  

  

}
