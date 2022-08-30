import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  usersData: any[]
  userMessages: any[]
  messages: any[]
  addMessagesForm: FormGroup
  socket: any
  userInfo = JSON.parse(localStorage.getItem("SocketStrorage") || "null")
  constructor(private http: HttpClient, private fb: FormBuilder) {

    this.socket = io('http://localhost:3000');

  }
  ngOnInit(): void {
    this.Init_AddMessageForm()
    this.getAllMessages()
    this.getUserMessages()
    this.getAllUsers()
  }

  Init_AddMessageForm() {
    this.addMessagesForm = this.fb.group({
      desc: ["", Validators.required],
      userReceive: ["", Validators.required]
    })
  }


  getAllMessages() {
    this.http.get("api/messages").subscribe({
      next: (res: any) => {
        this.socket.emit('send-message', res);
        this.socket.on("recieve-data", (data: any) => {
          this.messages = data.filter((data: any) => data.userReceive == this.userInfo._id)
          console.log(this.messages);
        })
      }
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

  getAllUsers() {
    this.http.get("api/users").subscribe({
      next: (res: any) => {
        this.usersData = res
      }
    })
  }

  addMessage() {
    const body = {
      desc: this.addMessagesForm.value.desc,
      userReceive: this.addMessagesForm.value.userReceive
    }
    this.http.post("/api/messages", body).subscribe({
      next: (res: any) => {
        this.getAllMessages()
      }
    })
  }

}
