import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }
  APICalling = false;

  getSiteDetails(callId: string): Observable<any> {
    this.APICalling = true;

    return new Observable((observer) => {
      this.http.get(environment.API_URL + `/admin/site/${callId}`).subscribe((data: any) => {
        this.APICalling = false;
        observer.next(data);
        observer.complete();
      })
    });
  }

}
