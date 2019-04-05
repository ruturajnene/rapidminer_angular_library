import {Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {RapidMinerService} from '../rapidminer.service';
import {RmLibService} from '../rm-lib.service';

@Component({
  selector: 'rml-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @Input('x-axis') xVal:string;
  @Input('y-axis') yVal:string;
  @Input('chartId') chartId:string;
  @Input('type') type:string;
  @Input('serviceName') serviceName:string[];
  @Input('params') params:any[];
  @Input('trigger') trigger:boolean;
  outputData=[];

  chart;

  constructor(private rapidMinerService: RapidMinerService, private libraryService: RmLibService) { }

  ngOnChanges(){

    if (this.trigger&&this.serviceName){
      for (let i = 0; i < this.serviceName.length; i++) {
        this.fetchData(this.serviceName[i],this.params[i]);
      }
    }

  }

  fetchData(service,param){
    this.rapidMinerService.submitService(service, [], param)
      .then(response => response.json())
      .then(response => {
        this.outputData.push(response);
        console.log('retrieving chart data');
        // console.log(this.outputData);
        // this.showChart();
        // this.showData=true;
      });
  }

  ngAfterViewChecked(){
    setTimeout(()=>{
      if (this.outputData.length==this.serviceName.length &&!this.chart){
        console.log('showing the chart for the first time');
        this.showChart();
      }
    })
  }

  showChart(){
    let x=this.xVal;
    let y=this.yVal;
    let labels=[];
    let datasets=[];
    // console.log(this.outputData);
    this.outputData.forEach(function (opData,index) {
      console.log('Each Dataset');
      console.log(opData);
      let data=[];
      if (index==0){
        opData.forEach(function (row) {
          labels.push(row[x]);
        });
      }
      console.log('labels');
      console.log(labels);
      opData.forEach(function (row) {
        data.push(row[y]);
      });
      let dataset={
        label: 'Chart ' + index,
        data:data,
        borderWidth:1
      };
      datasets.push(dataset);
    });
    /*        data.push(row[y]);
            data2.push(-row[y])*/
    console.log(datasets);

    this.chart= new Chart(document.getElementById(this.chartId), {
      type: this.type,
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:false
            }
          }]
        }
      }
    });
    console.log(this.chart);
  }
  ngOnInit() {
  }

}
