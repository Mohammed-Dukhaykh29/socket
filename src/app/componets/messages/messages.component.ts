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

  currentMessage: any = {
    title: "",
    description: "",
    messageTime: ""
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    console.log(this.currentMessage);

    this.Init_AddMessageForm()
    this.getAllMessages()
    this.getUserMessages()
    this.getAllUsers()
    this.socket.on("send-message", (data: any) => {
      this.messages = data.filter((d: any) => d.to.find((user: any) => user._id == this.userInfo._id))
      console.log(this.currentMessage);
    })
  }

  Init_AddMessageForm() {
    this.addMessagesForm = this.fb.group({
      title: ["", Validators.required],
      desc: ["", Validators.required],
      userReceive: ["", Validators.required]
    })
  }


  getAllMessages() {
    this.http.get("api/messages").subscribe({
      next: (res: any) => {

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
      title: this.addMessagesForm.value.title,
      description: this.addMessagesForm.value.desc,
      from: this.userInfo._id,
      to: this.addMessagesForm.value.userReceive,
    }

    this.http.post("/api/messages", body).subscribe({
      next: (res: any) => {

      }
    })
  }

  getMessage(messageId: string) {
    const body = {
      userRecive: this.userInfo._id
    }

    this.http.post(`api/messages/${messageId}`, body).subscribe({
      next: (res: any) => {
        this.currentMessage = res
        console.log(this.currentMessage);
      }
    })
  }
}
