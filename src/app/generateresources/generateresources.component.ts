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
  puzzles = [];
  real_puzzle;
  pmcompany;
  solved_puzzle = false;
  correct_matrix = [];
  current_matrix = [];
  solvable_puzzles = [[15, 2, 1, 12, 8, 5, 6, 11, 4, 9, 10, 7, 3, 14, 13, 16],
                      [6, 1, 10, 2, 7, 11, 4, 14, 5, 16, 9, 15, 8, 12, 13, 3]];

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  getAllPuzzles() {
    return this.httpService.getAllPuzzles().subscribe(data => {
      const data2 = JSON.parse(JSON.stringify((data)));
      this.real_puzzle = data2.data[this.randomIntFromInterval(0, this.puzzles.length-1)];
      this.initializePuzzle(data2);
      this.getCompanyById(this.service.user.companyId);
    });
  }

  getCompanyById(companyId: string) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      const data2 = JSON.parse(JSON.stringify(data));
      this.pmcompany = data2;
    });
  }

  initializePuzzle(data2) {
    this.puzzles = data2;
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
    console.log(this.correct_matrix);
    this.rewarded_resources = this.real_puzzle.rewarded_resources;
    this.load_complete = true;
    this.shuffleMatrix();   // scrambles the matrix that represents the puzzle the user has to solve
    // dibujar current_matrix
  }

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

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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

  verifyPuzzle(event) {
    let isSolved = true;
    console.log(isSolved);
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        const current_placement = this.current_matrix[i][j].getCurrent_placement();
        const real_placement = this.current_matrix[i][j].getReal_placement();
        isSolved = isSolved && (current_placement === real_placement);
        console.log(isSolved);
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
  sendResources(){
    const actually_resources = this.pmcompany.companyResource;
    const total_resources = actually_resources + this.rewarded_resources;
    return this.httpService.updateCompany({
        companyResource: total_resources}, this.service.user.companyId).subscribe( data => {
      console.log('success');
    });

  }

  haveCompany() {
    if (this.service.user.companyId === null){
      return false;
    } else {
      return true;
    }
  }

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


