import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RapidMinerService} from '../rapidminer.service';
import {RmLibService} from '../rm-lib.service';

@Component({
  selector: 'rml-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input('serviceName') serviceName:string;
  @Input('data') data:Object;
  @Input('params') params:Object[];
  @Input('size') size:number;
  @Input('trigger') trigger:boolean;
  @Output('output') output=new EventEmitter<Object>();
  outputData;
  fieldNames;
  Object=Object;
  Number=Number;
  isNaN=isNaN;

  constructor(private rapidMinerService: RapidMinerService, private libraryService: RmLibService) { }

  ngOnChanges(){

    if (this.serviceName=='local') {
      console.log(this.data);
      this.outputData=this.data;
      this.fieldNames = Object.keys(this.outputData[0]);
    }
    else if (this.trigger&&this.serviceName){
      this.rapidMinerService.submitService(this.serviceName, this.data, this.params)
        .then(response => response.json())
        .then(response => {
          this.outputData=response;
          console.log('retrieving data');
          console.log(this.outputData);
          // this.showData=true;
          this.fieldNames = Object.keys(this.outputData[0]);
          this.output.emit(this.outputData);
        });
    }

  }

  ngOnInit() {
  }

}
