import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CommunicationService } from 'src/app/communication.service';

@Component({
  selector: 'app-hex-test',
  templateUrl: './hex-test.component.html',
  styleUrls: ['./hex-test.component.css']
})
export class HexTestComponent implements OnInit {
input: any;
output: any;

  constructor(public dialog: MatDialog,private http: HttpClient, private router: Router,private service: CommunicationService) {
    this.output = "waiting for input..."
  }
  ngOnInit(): void {}

  testConnection() {
    this.http.get(this.service.hexTestPath).subscribe( result => {
      alert(result);
    });
  }
  sendMessage() {
    this.http.get(this.service.hexInputPath + this.input).subscribe(result => {
      this.output = result
    });
  }
}
