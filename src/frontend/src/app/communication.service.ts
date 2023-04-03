import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Service welcher die Kommunikation für das Backend bereitstellt.
 * 
 */
@Injectable()
export class CommunicationService {

  constructor(private httpClient: HttpClient) { }

  public backend = "http://localhost:8000"; 
  public hexTestPath = this.backend + "/test/connection/"
  public hexInputPath = this.backend + "/input/"
}