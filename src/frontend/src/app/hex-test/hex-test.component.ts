import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CommunicationService } from 'src/app/communication.service';
import { LoginscreenComponent } from '../loginscreen/loginscreen.component';

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
  ngOnInit() {
    const dialogRef = this.dialog.open(LoginscreenComponent, {
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // this.router.navigate(['/start']);
      }
    });
  }
  testConnection() {
    this.http.get(this.service.hexTestPath).subscribe( result => {
      alert(result);
    });
  }
}
