import {Component, Input, OnInit} from '@angular/core';
import {RapidMinerService} from '../rapidminer.service';

// @ts-ignore
@Component({
  selector: 'rml-data-weights-table',
  templateUrl: './data-weights-table.component.html',
  styleUrls: ['./data-weights-table.component.css']
})
export class DataWeightsTableComponent implements OnInit {

  data;
  params;
  serviceName;
  @Input('trigger') trigger:boolean;
  constructor(public rapidMinerService:RapidMinerService) { }


  ngOnInit() {
    this.serviceName='retrieveData';
    this.data=[];
    this.params=[{key:'guid',value:this.rapidMinerService.guid}];
  }

}
