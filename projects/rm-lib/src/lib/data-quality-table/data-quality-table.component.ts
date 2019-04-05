import {Component, Input, OnInit} from '@angular/core';
import {RapidMinerService} from '../rapidminer.service';


@Component({
  selector: 'rml-data-quality-table',
  templateUrl: './data-quality-table.component.html',
  styleUrls: ['./data-quality-table.component.css']
})
export class DataQualityTableComponent implements OnInit {
  // input data
  @Input('data') data: Object;
  @Input('trigger') trigger:boolean;
  params;

  constructor(public rapidMinerService:RapidMinerService) { }

  ngOnInit() {
  }

}
