
import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-gptchat',
  templateUrl: './gptchat.component.html',
  styleUrls: ['./gptchat.component.scss']
})
export class GptchatComponent {

   
   constructor(public dialog: MatDialog,private http: HttpClient, private router: Router,private service: CommunicationService) {}
  
   @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
   chatInputMessage: string = "";
   human = {
     id: 1,
     profileImageUrl: 'assets/user.png'
   }
  
   bot = {
     id: 2,
     profileImageUrl: 'assets/chatbot.png'
   }
  
   chatMessages: {
     user: any,
     message: string
   }[] = [
     {
       user: this.bot,
       message: "Hello! I am a Chatbot currently powered by gpt-3.5-turbo how may I assist you?"
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
      this.http.get(this.service.gptInputPath + this.chatInputMessage).subscribe(result => {
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
    this.http.get(this.service.gptClearPath).subscribe(result => {
      this.chatMessages = [];
      this.chatMessages.push({
        message: result.toString(),
        user: this.bot
      });
    });
    this.chatInputMessage = ""
   }
  }