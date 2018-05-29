import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatSelect } from "@angular/material";
import {HttpService} from '../http.service';
import { Puzzle } from '../shared/puzzle';

@Component({
  selector: 'app-create-puzzle',
  templateUrl: './create-puzzle.component.html',
  styleUrls: ['./create-puzzle.component.css']
})
export class CreatePuzzleComponent implements OnInit {
  url = '';
  formdata;
  puzzle;
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
  
  onClickSubmit(data){
	  this.puzzle = new Puzzle(this.formdata.resources, this.url);
	  return this.httpService.createPuzzle(this.puzzle).subscribe(data => console.log(data));
  }
  

  // shows the image when the file is selected
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
  }
  ngOnInit() {

  }
}
