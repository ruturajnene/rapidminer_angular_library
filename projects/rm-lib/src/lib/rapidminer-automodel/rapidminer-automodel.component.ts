import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


import {RapidMinerService} from '../rapidminer.service';
import {RmLibService} from '../rm-lib.service';

@Component({
  selector: 'rml-rapidminer-automodel',
  templateUrl: './rapidminer-automodel.component.html',
  styleUrls: ['./rapidminer-automodel.component.css']
})
export class RapidminerAutomodelComponent implements OnInit {

  // input data
  @Input('data') data: Object;

  // output data to indicate completion of job( with jobIds)
  @Output() jobs= new EventEmitter<any[]>();
  // template variables

  // attribute names
  fieldNames;

  // target label to predict
  target;
  // decisionTree option
  decisionTree;
  // naiveBayes option
  naiveBayes;
  // generalizedLinearModel option
  generalizedLinearModel;
  models=[];
  selectColumnDiv = true;
  selectModelDiv;
  Object = Object;
  trigger=false;
  disabled=false;
  //  path to directory for storing data
  private path = '/home/rnene/AutoModel/Data/';
  private naiveBayesPath = '/home/rnene/AutoModel/Process/Predictions/naivebayes2';
  jobIds;

  // guid: string;

  constructor(private rapidMinerService: RapidMinerService, private libraryService: RmLibService) {
  }

  selectColumn(target) {
    this.target = target;
  }

  predict() {
    if (this.decisionTree) {
      console.log('Decision Tree');
      //   var processxml = getProcessXML("/home/automodel/dt"),
      //     macroJSONObject = "{}";
      //    var processXML  =replaceMAcros(processxml, MacrosJSONOBject);
      //  var jsonreturn= SubmitJOB("DEFAULT",procesxml,"location")
      //   var jsonreturn= SubmitService("DEFAULT",procesxml,"location")

    }
    if (this.generalizedLinearModel) {
      console.log('generalizedLinearModel');
    }
    if (this.naiveBayes) {
      console.log('Naive Bayes');
      /*      let naiveBayesXML;
            this.rapidMinerService.getProcessXML(this.naiveBayesPath)
              .then(promise => promise.text())
              .then(response => {
                naiveBayesXML = response;
                console.log(naiveBayesXML);
                naiveBayesXML = naiveBayesXML.replace(/%{guid}/g, this.guid);
                naiveBayesXML = naiveBayesXML.replace('%{label}', this.target);
                console.log('Final XML: ' + naiveBayesXML);

                // to-do
                // also post the process
                this.rapidMinerService.submitJobXML('DEFAULT',
                 naiveBayesXML, '/home/rnene/AutoModel/Data/'+this.guid+'/naive_bayes/process')
                  .then(promise => console.log(promise));
              });*/
      let params = [{key: '%{guid}', value: this.rapidMinerService.guid}, {key: '%{label}', value: this.target}];
      this.rapidMinerService.submitJob('DEFAULT', this.naiveBayesPath, params, '/home/rnene/AutoModel/Data/' + this.rapidMinerService.guid + '/naive_bayes/process');
    }
  }


  // stores the selected models and also saves the input data in the rapidminer repo.
  selectModel() {
    // this.guid = this.rapidMinerService.generateGUID();
    // let params = [{key: 'path', value: this.path + this.guid + '/' + this.guid}];
    // this.rapidMinerService.submitService('saveData', this.data, params)
    //   .then(response => response.json())
    //   .then(response => console.log(response));
    this.selectColumnDiv = false;
    this.selectModelDiv = true;
  }


  ngOnChanges() {
   // this.libraryService.checkAuth();
    console.log('Checked Authorization');

    this.rapidMinerService.generateGUID();

  }

  AutoModelstepChanged($event) {
    if($event.previouslySelectedIndex==0){
      console.log("inside upload");
      let params = [{key: 'path', value: this.path + this.rapidMinerService.guid + '/' + this.rapidMinerService.guid}];
      this.rapidMinerService.submitService('saveData', this.data, params)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.fieldNames = Object.keys(this.data[0]);
          this.trigger=true;

        });
    }

    if ($event.previouslySelectedIndex==3){
      if (this.models['naive_bayes']){/*
              let naiveBayesXML;
            this.rapidMinerService.getProcessXML(this.naiveBayesPath)
              .then(promise => promise.text())
              .then(response => {
                naiveBayesXML = response;
                console.log(naiveBayesXML);
                naiveBayesXML = naiveBayesXML.replace(/%{guid}/g, this.rapidMinerService.guid);
                naiveBayesXML = naiveBayesXML.replace('%{label}', this.target);
                console.log('Final XML: ' + naiveBayesXML);

                // to-do
                // also post the process
                this.rapidMinerService.submitJobXML('DEFAULT',
                 naiveBayesXML, '/home/rnene/AutoModel/Data/'+this.rapidMinerService.guid+'/naive_bayes/process')
                  .then(promise => console.log(promise));
              });*/
        let params = [{key: '%{guid}', value: this.rapidMinerService.guid}, {key: '%{label}', value: this.target}];
        this.rapidMinerService.submitJob('DEFAULT', this.naiveBayesPath, params, '/home/rnene/AutoModel/Data/' + this.rapidMinerService.guid + '/naive_bayes/process')
          .then(response=>{
            this.jobIds=[];
            this.jobIds.push(response.id)});
      }
    }


    console.log($event);
  }

  publishResults(){
    console.log('Emitting Results');
    this.jobs.emit(this.models);
  }

  getModels(models:any[]){
    this.disabled=Object.values(models).reduce(function (total,val) {
      return val||total;
    },false);
    if (this.disabled){
      this.models=models;
    }
  }
  ngOnInit() {

    // this.data = JSON.parse('[{"att1":2.467612009982549,"att2":7.2671269538811885,"label":0.5646206387581426},' +
    //   '                           {"att1":-8.624734314791924,"att2":-5.589923335093689,"label":0.4846603438968893}] ');

  }
}
