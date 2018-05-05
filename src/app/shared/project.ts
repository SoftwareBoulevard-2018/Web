export Abstract class Project {
  id:number;
  name:string;
  assignment:boolean;
  number_of_questions_analysts:number;
  number_of_questions_developer:number;
  number_of_questions_tester:number;
  k_capacity:number;
  rewarded_k_units:number;

  constructor(id?:number, name?:string, assignment?:boolean, number_of_questions_analysts?:number,
    number_of_questions_developer?:number, number_of_questions_tester?:number, k_capacity?:number,
    rewarded_k_units?:number){
    this.id = id;
    this.name = name;
    this.assignment = assignment;
    this.number_of_questions_analysts = number_of_questions_analysts;
    this.number_of_questions_developer = number_of_questions_developer;
    this.number_of_questions_tester = number_of_questions_tester;
    this.k_capacity = k_capacity;
    this.rewarded_k_units = rewarded_k_units;
  }
}

export class InstantProject extends Project {
  constructor(id?:number, name?:string, assignment?:boolean, number_of_questions_analysts?:number,
    number_of_questions_developer?:number, number_of_questions_tester?:number, k_capacity?:number,
    rewarded_k_units?:number){
    super(id, name, assignment, number_of_questions_analysts, number_of_questions_developer,
      number_of_questions_tester, k_capacity, rewarded_k_units);
  }
}

export class BiddingProject extends Project {
  cost:number;
  time:number;
  required_k_level:number;
  required_tester_level:number;
  required_developer_level:number;
  required_analyst_level:number;
  constructor(id?:number, name?:string, assignment?:boolean, number_of_questions_analysts?:number,
    number_of_questions_developer?:number, number_of_questions_tester?:number, k_capacity?:number,
    rewarded_k_units?:number, cost?:number, time?:number, required_k_level?:number, required_tester_level?:number,
    required_analyst_level?:number, required_developer_level?:number){
    super(id, name, assignment, number_of_questions_analysts, number_of_questions_developer,
      number_of_questions_tester, k_capacity, rewarded_k_units);
    this.cost = cost;
    this.time = time;
    this.required_k_level = required_k_level;
    this.required_tester_level = required_tester_level;
    this.required_analyst_level = required_analyst_level;
    this.required_developer_level = required_developer_level;
  }
}
