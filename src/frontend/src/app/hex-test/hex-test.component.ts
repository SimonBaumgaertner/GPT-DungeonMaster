import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/communication.service';

@Component({
  selector: 'app-hex-test',
  templateUrl: './hex-test.component.html',
  styleUrls: ['./hex-test.component.css']
})
export class HexTestComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router,private service: CommunicationService) {}
  ngOnInit(): void {}

  testConnection() {
    this.http.get(this.service.hexTestPath).subscribe( result => {
      alert(result);
    });
  }
}
