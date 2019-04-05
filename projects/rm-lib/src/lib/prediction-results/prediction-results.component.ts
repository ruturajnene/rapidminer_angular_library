import {Component, Input, OnInit} from '@angular/core';
import {RapidMinerService} from '../rapidminer.service';

@Component({
  selector: 'rml-prediction-results',
  templateUrl: './prediction-results.component.html',
  styleUrls: ['./prediction-results.component.css']
})
export class PredictionResultsComponent implements OnInit {

  // jobs submitted for each automodel model
  @Input('jobs') jobs: any[];
  Object = Object;
  state;
  showResults;
  serviceName;
  trigger;
  params;
  data;

  constructor(private rapidMinerService: RapidMinerService) {
  }

  ngOnChanges() {

    let rmS=this.rapidMinerService;
    if (this.jobs) {
      let states = ['TIMED_OUT', 'STOPPED', 'FINISHED', 'ERROR'];
      let jobs=this.jobs;
      let state='';

      let fetchNow = function() {
        return rmS.getJob(jobs[0]).then(response => response.json()).then(response => state = response.state)
          .then(function() {
          if(states.includes(state)) {
            console.log('Finished: '+state);
            return state;
          }
          else {
            let x= fetchNow().then(response=>response);
            console.log('return from fn: ');
            console.log(x);
            return x;
          }
        });
      };

      fetchNow().then(response=>{
        this.state=response;
        console.log(this.state);
      });

    }
  }



  ngAfterViewChecked(){
    if (this.state){
      setTimeout(()=>{
        if(this.state=='FINISHED'&&!this.showResults){
          this.showResults=true;
          this.serviceName='getData';
          this.data=[];
          this.params=[{key:'guid',value:this.rapidMinerService.guid},{key:'model',value:'naive_bayes'}];
          this.trigger=true;
        }
      });
    }
  }

  ngOnInit() {
  }

}
