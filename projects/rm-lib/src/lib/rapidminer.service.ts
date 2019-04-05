import { Injectable } from '@angular/core';
import {RmLibService} from './rm-lib.service';

@Injectable({
  providedIn: 'root'
})
export class RapidMinerService {


  constructor(private libraryService: RmLibService) { }

  guid:string;

  private S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  // service for generating GUID
  generateGUID(){
    this.guid=(this.S4() + this.S4() + '-' + this.S4() + '-4' + this.S4().substr(0, 3) + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4()).toLowerCase();
  }


  //service for submitting webservices
  submitService(serviceName:string,data:Object,params){
    let url='';
    if (params){
      url=params.reduce(function (url,param) {
        return url+param['key']+'='+param['value']+'&'
      },'');
      url=url.substring(0,url.length-1);
    }
    return fetch(this.libraryService.server_url + '/api/rest/process/'+serviceName+'?'+url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Authorization': 'Bearer ' + this.libraryService.auth_token,
        'content-type': 'application/json'
      }
    });
  }

  // service for getting the processXML
  getProcessXML(processPath:string){
    return fetch(this.libraryService.server_url + '/api/rest/resources' + processPath, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + this.libraryService.auth_token
      }
    });
  }

  // mthod to submit job with Raw XML the job
  submitJobXML(queueName:string, processXML:string, location:string){
    const process = {'queueName': queueName, 'process': btoa(processXML), 'location': location};
    return fetch(this.libraryService.server_url + '/executions/jobs', {
      method: 'post',
      body: JSON.stringify(process),
      headers: {
        'Authorization': 'Bearer ' + this.libraryService.auth_token,
        'content-type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => {
        console.log('Job Submitted:');
        console.log(response);
        return response;
      });
  }

  // method to submit job with with reference to process path on server
  submitJob(queueName:string,processPath:string,params,location:string){
    let processXML;
    return this.getProcessXML(processPath)
      .then(promise => promise.text())
      .then(response => {
        processXML = response;

        params.forEach(function (param) {
          processXML = processXML.replace(new RegExp(param['key'],'g'), param['value']);
        });
        // to-do
        // also post the process
        return this.submitJobXML('DEFAULT', processXML, location)
          .then(promise => promise);
      });
  }


  getJob(jobId:string){
    return fetch(this.libraryService.server_url + '/executions/jobs/'+jobId,{
      method:'get',
      headers: {
        'Authorization': 'Bearer ' + this.libraryService.auth_token,
        'content-type': 'application/json'
      }
    })
  }



}
