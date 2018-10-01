import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatSelect } from "@angular/material";
import {HttpService} from '../http.service';
import { creationPuzzle } from '../shared/creationPuzzle';

@Component({
  selector: 'app-create-puzzle',
  templateUrl: './create-puzzle.component.html',
  styleUrls: ['./create-puzzle.component.css']
})
export class CreatePuzzleComponent implements OnInit {
  url = '';
  formdata;
  puzzle;
  filename;
  success;
  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router){}

  form(){
    this.formdata = new FormGroup({
      resources: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
	  file: new FormControl(''),
    });
  }
  
  createPuzzle(puzzle) {
		return this.httpService.createPuzzle(puzzle).subscribe(data => console.log(puzzle));
  }
   onClickSubmit(data){
	  this.puzzle = new creationPuzzle(data.resources, this.url, this.filename);
	  this.createPuzzle(this.puzzle);
	  this.router.navigate(['home/set-up'])
	  this.success = true;
  } 
  

  // shows the image when the file is selected
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
	  this.filename = event.target.files[0].name.toLowerCase();;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
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
  
}
