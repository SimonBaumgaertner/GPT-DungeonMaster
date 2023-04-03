import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Component({
 selector: 'app-chat',
 templateUrl: './chat.component.html',
 styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
 title = 'chat-ui';
 
 constructor(public dialog: MatDialog,private http: HttpClient, private router: Router,private service: CommunicationService) {}

 @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
 chatInputMessage: string = "";
 human = {
   id: 1,
   profileImageUrl: 'assets/mon.png'
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
    this.http.get(this.service.hexInputPath + this.chatInputMessage).subscribe(result => {
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
    this.chatMessages = [];
 }
}