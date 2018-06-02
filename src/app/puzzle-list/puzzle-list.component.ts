import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Certification } from '../shared/certification';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
  
 puzzles = [];
 puzzles2: MatTableDataSource<Certification>;
 
 table_titles = ['image', 'resources', 'update'];

  ngOnInit() {
    // Transforms the data to the necessary format to be read by material tables
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.puzzles2 = new MatTableDataSource(this.puzzles);
      this.getAllPuzzles();
    }
  }
  
  getAllPuzzles() {
    return this.httpService.getAllPuzzles().subscribe(data => this.listPuzzles(data));
  }
  
  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.puzzles2.filter = filterValue;
  }
  
  redirect(event, element) {
    // Redirects to New Instant project project
    if (this.service.user_type === "Game Administrator") {
	   this.service.puzzle_to_be_updated = element;
      this.router.navigate(['home/set-up/update-puzzle']);
    }
  }
  
  listPuzzles(data) {
    this.puzzles = [];
    for (const puzzle of Object.values(data.data)) {
        this.puzzles.push(puzzle);
        this.puzzles2.data = this.puzzles;
    }
  }

}
