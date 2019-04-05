import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rml-rm-jobs',
  templateUrl: './rm-jobs.component.html',
  styleUrls: ['./rm-jobs.component.css']
})
export class RmJobsComponent implements OnInit {

  auth_token;
  server_url;
  processXML;
  get_process = true;
  edit_params;
  guid;
  submit_job;
  job_response;
  Object = Object;
  qlikDataPath='/home/rnene/Qlik/Data/';

  @Input('process') processPath: string;
  @Input('macros') processParam: any[];
  @Input('data') data:Object;

  checkAuth() {
    const token = window.localStorage.getItem('jwt-token');
    const url = `${window.location.protocol}//${window.location.host}`;
    if (!token) {
      window.location.replace(`${url}/rapidminer-auth`);
    } else {
      this.auth_token = token;
      this.server_url = url;
    }
  }

  logout() {
    window.localStorage.removeItem('jwt-token');
    window.location.replace(this.server_url + `/rapidminer-auth`);
  }

  submitJob() {
    let xml = this.processXML;
    this.processParam.forEach(function (param) {
      xml = xml.replace(param.key, param.value);
    });
    this.processXML = xml;
    const process = {'queueName': 'DEFAULT', 'process': btoa(this.processXML), 'location': this.processPath};
    fetch(this.server_url + '/executions/jobs', {
      method: 'post',
      body: JSON.stringify(process),
      headers: {
        'Authorization': 'Bearer ' + this.auth_token,
        'content-type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        this.job_response = response;
        this.edit_params = false;
        this.submit_job = true;
      });
  }

  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  postDataToRapidMiner() {
    if (this.data) {

      // then to call it, plus stitch in '4' in the third group
      this.guid = (this.S4() + this.S4() + '-' + this.S4() + '-4' + this.S4().substr(0, 3) + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4()).toLowerCase();
      fetch(this.server_url + '/api/rest/process/getData?guid='+this.qlikDataPath + this.guid, {
        method: 'post',
        body: JSON.stringify(this.data),
        headers: {
          'Authorization': 'Bearer ' + this.auth_token,
          'content-type': 'application/json'
        }
      }).then(response => console.log(response));
    }
  }

  getProcess(processPath) {
    this.postDataToRapidMiner();
    this.processPath = processPath;
    fetch(this.server_url + '/api/rest/resources' + processPath, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + this.auth_token
      }
    }).then(promise => promise.text())
      .then(process => {
        this.processXML = process;
        // console.log(process);
        const re = /%{[a-zA-Z_]+}/g;
        let m = this.processXML.match(re);
        const params = [];
        console.log('Final Parameter Dict', this.processParam);
        if (this.processParam[0] == '*' && this.processParam.length == 1) {
          console.log('All Parameters');
          m.forEach(function (param) {
            params.push({key: param, value: ''});
          });
          this.processParam = params;
          console.log(this.processParam);
        } else {
          console.log('Filtered parameters');
          console.log('M= ', m);
          const temp = this.processParam;
          m = m.filter(function (param) {
            return temp.includes(param.substring(2, param.length - 1));
          });
          console.log('Filtered M= ', m);
          m.forEach(function (param) {
            params.push({key: param, value: ''});
          });
          this.processParam = params;
          if (this.data){

            let path=this.qlikDataPath;
            let guid=this.guid;
            this.processParam.forEach(function (param) {
              if (param.key=='%{data_source}'){
                param.value=path+guid;
              }
            })
          } 
          console.log('Final Filtered Parameter dict', this.processParam);
          this.get_process = false;
          this.edit_params = true;
        }
      });
  }

  constructor() {
  }

  ngOnInit() {
    this.checkAuth();
  }

}
