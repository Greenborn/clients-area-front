import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class PublicBugReportService extends ApiService<any>{

  constructor( http: HttpClient,
    config: ConfigService) {
      super('public-bug-report', http, config)
     }
    
    get template(): any {
        return {
            
        }
    }
}