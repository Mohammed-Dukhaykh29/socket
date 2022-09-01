import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  messages: any[]
  userMessages: any[]
  socket: any
  userInfo = JSON.parse(localStorage.getItem("SocketStrorage") || "null")
  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.getUserMessages()
    this.socket.on("send-message", (data: any) => {
      this.messages = data.filter((data: any) => data.userReceive == this.userInfo._id)
      console.log(this.messages);
    })
  }

  getUserMessages() {
    let userInfo = JSON.parse(localStorage.getItem("SocketStrorage") || "null")
    this.http.get(`api/messages/${userInfo._id}`).subscribe({
      next: (res: any) => {
        this.userMessages = res
      }
    })
  }
}
