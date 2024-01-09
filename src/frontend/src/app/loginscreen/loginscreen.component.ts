import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css'],
})
export class LoginscreenComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  loginSuccess = false;
  trys = 1;

  constructor(public dialogRef: MatDialogRef<LoginscreenComponent>, private http: HttpClient,private service: CommunicationService) {}

  ngOnInit(): void {}

  authenticate() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { 'username': this.username, 'password': this.password };
    this.http.post<any>(this.service.authenticatePath, JSON.stringify(body), { headers })
      .subscribe(result => {
        console.log(result);
        this.loginSuccess = result.authenticated;
        localStorage.setItem('loggedInUser', this.username ?? "");
        if (result) {
          this.loginSuccess = true;
          this.dialogRef.close();
        } else {
          alert("That login was incorrect! Try: " + this.trys++)
        }
      });
  }
}