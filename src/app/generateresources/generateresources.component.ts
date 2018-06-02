import { Component, OnInit } from '@angular/core';
import {BiddingProject} from '../shared/biddingProject';
import {GeneralServiceService} from '../general-service.service';
import {Router} from '@angular/router';
import {PuzzleTile} from '../shared/puzzleTile';
import {HttpService} from "../http.service";
import {Puzzle} from "../shared/puzzle";
import {Company} from "../shared/company";


@Component({
  selector: 'app-generateresources',
  templateUrl: './generateresources.component.html',
  styleUrls: ['./generateresources.component.css']
})
export class GenerateresourcesComponent implements OnInit {

  load_complete = false;
  rewarded_resources: number;
  puzzles= [];
  real_puzzle;
  pmcompany;
  solved_puzzle = false;
  correct_matrix = [];
  current_matrix = [];

  // Matrix with the correct positions in which the puzzle can be located and be solvable
  solvable_puzzles = [[9, 6, 5, 8, 4, 2, 16, 15, 7, 13, 3, 12, 11, 10, 1, 14],
                      [9, 6, 5, 8, 4, 3, 13, 12, 7, 10, 15, 14, 16, 11, 2, 1],
                      [10, 6, 12, 11, 16, 14, 4, 2, 9, 8, 3, 5, 13, 1, 15, 7],
                      [16, 10, 6, 12, 9, 3, 2, 11, 8, 7, 14, 5, 13, 4, 15, 1],
                      [6, 8, 9, 12, 4, 3, 10, 11, 14, 15, 13, 5, 2, 7, 1, 16],
                      [6, 3, 8, 12, 4, 9, 5, 10, 2, 16, 14, 11, 7, 13, 15, 1],
                      [1, 14, 3, 16, 7, 6, 11, 5, 4, 13, 15, 8, 12, 2, 9, 10],
                      [12, 7, 9, 6, 8, 1, 14, 16, 5, 11, 15, 10, 13, 4, 3, 2],
                      [7, 8, 6, 5, 12, 9, 4, 15, 14, 16, 1, 3, 13, 2, 11, 10],
                      [6, 8, 2, 12, 9, 10, 14, 11, 4, 3, 15, 5, 7, 13, 16, 1],
                      [7, 5, 9, 6, 12, 11, 1, 3, 16, 14, 8, 15, 13, 4, 2, 10],
                      [10, 3, 16, 12, 4, 11, 6, 1, 9, 8, 2, 7, 13, 15, 5, 14]];

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  // functionality of the exit button
  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  //function that brings all the puzzle of the database
  getAllPuzzles() {
    return this.httpService.getAllPuzzles().subscribe(data => {
      const data2 = JSON.parse(JSON.stringify((data)));
      this.puzzles = data2.data;
      let length = this.puzzles.length;
      let element = this.randomIntFromInterval(0, (length));
      this.real_puzzle = this.puzzles[element];
      this.initializePuzzle(data2);
      this.getCompanyById(this.service.user.companyId);
    }, error => {

    });
  }

  //function that searches for a company id and brings it from the database
  getCompanyById(companyId: string) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      const data2 = JSON.parse(JSON.stringify(data));
      this.pmcompany = data2;
    }, error => {

    });
  }

  //function that defines the initial positions of the puzzle
  initializePuzzle(data2) {
    let image: string;
    let position = 0;
    for (let i = 0; i <= 3; i++) {
      this.correct_matrix.push([]);
      for (let j = 0; j <= 3; j++) {
        position += 1;
        if (i === 3 && j === 3) {     // empty piece
          this.correct_matrix[i].push(new PuzzleTile(position, position, true, 'https://orig00.deviantart.net/23c9/f/2018/148/3/5/black__www_imagesplitter_net__by_jokerpiece-dccr35m.png'));
        }
        else {
          image = this.real_puzzle.slicedImage[position-1];
          this.correct_matrix[i].push(new PuzzleTile(position, position, false, image));
        }
      }
    }
    this.rewarded_resources = this.real_puzzle.rewarded_resources;
    this.load_complete = true;
    this.shuffleMatrix();
  }

  //function that converts the index of a vector into those of a matrix
  mapArrayToMatrix(n: number) {
    if (n === 4) {
      return [0, 3];
    }
    else if (n === 8) {
      return [1, 3];
    }
    else if (n === 12) {
      return [2, 3];
    }
    else if (n === 16) {
      return [3, 3];
    }
    else if (n >= 1 && n <= 3) {
      return [0, (n % 4) - 1];
    }
    else if (n >= 5 && n <= 7) {
      return [1, (n % 4) - 1];
    }
    else if (n >= 9 && n <= 11) {
      return [2, (n % 4) - 1];
    }
    else if (n >= 13 && n <= 15) {
      return [3, (n % 4) - 1];
    }
  }

  //function that releases a random element between a maximum and a minimum
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max) + min);
  }

  // scrambles the matrix that represents the puzzle the user has to solve
  shuffleMatrix() {
    const configuration_number = this.randomIntFromInterval(0, this.solvable_puzzles.length - 1);
    const configuration = this.solvable_puzzles[configuration_number];
    let conf_position = 0;

    for (let i = 0; i <= 3; i++) {
      this.current_matrix.push([]);
      for (let j = 0; j <= 3; j++) {
        const tuple = this.mapArrayToMatrix(configuration[conf_position]);
        let nextTile = this.correct_matrix[tuple[0]][tuple[1]];
        nextTile.setCurrent_placement(conf_position + 1);
        this.current_matrix[i].push(nextTile);
        conf_position += 1;
      }
    }
  }

  //check if the selected piece can be moved with respect to the empty box
  isMovableTile(tile: PuzzleTile) {
    const direction = this.mapArrayToMatrix(tile.getCurrent_placement());
    const tile_i = direction[0];
    const tile_j = direction[1];

    let candidates = [[tile_i - 1, tile_j], [tile_i + 1, tile_j], [tile_i, tile_j - 1], [tile_i, tile_j + 1]];
    // filter locations outside of the matrix
    for (let i = 0; i <= candidates.length - 1; i++) {
      let tuple = candidates[i];
      if (tuple[0] < 0 || tuple[0] > 3 || tuple[1] < 0 || tuple[1] > 3) {

        candidates.splice(candidates.indexOf(tuple), 1);
        i -= 1;
      }
      else {
        let potential_tile = this.current_matrix[tuple[0]][tuple[1]];
        if (potential_tile.isEmpty) {
          return tuple;
        }
      }
    }
    return -1;  // cant move the piece
  }

  // candidate is the name of the tile the user wants to move
  moveTile(event, position_array: number) {
    let tuple = this.mapArrayToMatrix(position_array);
    let candidate = this.current_matrix[tuple[0]][tuple[1]];
    let empty_direction = this.isMovableTile(candidate);
    if (empty_direction !== -1) {
      let emptyTile = this.current_matrix[empty_direction[0]][empty_direction[1]];
      let newCurrentPlacement = emptyTile.getCurrent_placement();
      let newEmptyPlacement = candidate.getCurrent_placement();
      let newEmptyTuple = this.mapArrayToMatrix(newEmptyPlacement);

      candidate.setCurrent_placement(newCurrentPlacement);
      emptyTile.setCurrent_placement(newEmptyPlacement);

      this.current_matrix[empty_direction[0]][empty_direction[1]] = candidate;
      this.current_matrix[newEmptyTuple[0]][newEmptyTuple[1]] = emptyTile;
    }

  }

  //Button operation validate, check if the positions are correct
  verifyPuzzle(event) {
    let isSolved = true;
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        const current_placement = this.current_matrix[i][j].getCurrent_placement();
        const real_placement = this.current_matrix[i][j].getReal_placement();
        isSolved = isSolved && (current_placement === real_placement);
      }
    }
    if (isSolved === true){
      alert("congratulations you have solved the puzzle, " +
        "you have generated " + this.rewarded_resources + " resources"
      );
      this.sendResources();
      this.router.navigate(['home/users/projectmanager/functions']);
    }
    return isSolved;
  }

  //modify and send the resources to the database
  sendResources(){
    const actually_resources = this.pmcompany.companyResource;
    const total_resources = actually_resources + this.rewarded_resources;
    return this.httpService.updateCompany({
        companyResource: total_resources}, this.service.user.companyId).subscribe( data => {
    }, error => {

    });

  }

  //check if you have company
  haveCompany() {
    if (this.service.user.companyId === null){
      return false;
    } else {
      return true;
    }
  }

  //main operation
  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    else if (this.service.user_type === 'Team Member') {
      this.router.navigate(['restricted']);
    }
    else {
      this.getAllPuzzles();
    }
  }

}


