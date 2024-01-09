import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Component, ElementRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Component({
 selector: 'app-storychat',
 templateUrl: './storychat.component.html',
 styleUrls: ['./storychat.component.scss']
})
export class StorychatComponent {
 title = 'chat-ui';
 
 constructor(public dialog: MatDialog,private http: HttpClient, private router: Router,private service: CommunicationService) {}

 @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
 chatInputMessage: string = "";
 human = {
   id: 1,
   profileImageUrl: 'assets/user.png'
 }

 bot = {
   id: 2,
   profileImageUrl: 'assets/mercer.png'
 }

 chatMessages: {
   user: any,
   message: string
 }[] = [
   {
     user: this.bot,
     message: "Welcome adventurer! To begin, please tell me your character's name, race, class, and backstory. Let's embark on a quest like no other and see where this adventure takes us!"
   },
 ];

 ngAfterViewChecked() {
   this.scrollToBottom()
 }

 send() {
   this.chatMessages.push({
     message: this.chatInputMessage,
     user: this.human
   });
   const headers = new HttpHeaders().set('Content-Type', 'application/json');
   const body = { 'username':  localStorage.getItem('loggedInUser'), 'message': this.chatInputMessage};
   this.http.post<any>(this.service.storyInputPath, JSON.stringify(body), { headers })
     .subscribe(result => {
     this.chatMessages = [];
     this.chatMessages.push({
       message: result.toString(),
       user: this.bot
   });
 });
 this.chatInputMessage = ""

  this.scrollToBottom()
 }

 scrollToBottom() {
   const maxScroll = this.list?.nativeElement.scrollHeight;
   this.list?.nativeElement.scrollTo({top: maxScroll, behavior: 'smooth'});
 }

 generateFakeId(): string {
   const current = new Date();
   const timestamp = current.getTime();
   return timestamp.toString()
 }

 clearConversation() {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { 'username':  localStorage.getItem('loggedInUser')};
    this.http.post<any>(this.service.authenticatePath, JSON.stringify(body), { headers })
      .subscribe(result => {
      this.chatMessages = [];
      this.chatMessages.push({
        message: result.toString(),
        user: this.bot
    });
  });
  this.chatInputMessage = ""
 }
}