import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rml-select-learners',
  templateUrl: './select-learners.component.html',
  styleUrls: ['./select-learners.component.css']
})
export class SelectLearnersComponent implements OnInit {

  dt=false;
  nb=false;
  glm=false;
  @Output('models') models= new EventEmitter<any[]>();

  constructor() {
  }

  onChange() {
    let models=[];
    models['naive_bayes']=this.nb;
    models['decision_tree']=this.dt;
    models['generalized_linear_model']=this.glm;
    this.models.emit(models)
  }

  ngOnInit() {
  }

}
