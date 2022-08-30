import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socket-project';

  private socket: any;
  public data: any;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');

  }

  ngOnInit() {

    // this.getAllMessages()

    // this.getAllUsers()
  }

  getAllUsers() {
    this.http.get("api/users").subscribe({
      next: (res: any) => {
        // console.log(res);
      }
    })
  }

  // getAllMessages() {
  //   this.http.get("api/messages").subscribe({
  //     next: (res: any) => {
  //       // console.log(res);
  //       this.socket.emit('send-message', res);
  //       console.log(res);
  //       this.socket.on("recieve-data", (data: any) => {
  //         this.data = data
  //         console.log(data);

  //       })
      
  //     }
  //   })
  // }

  // addMsg() {
  //   let body = {
  //     name: "Ahmed"
  //   }
  //   this.http.post("api/messages", body).subscribe({
  //     next: (res: any) => {
  //       // this.socket.emit('send-message', res);
  //       this.getAllMessages()
  //     }
  //   })
  // }

  // deleteMesages() {
  //   this.http.delete("api/messages").subscribe({
  //     next: (res: any) => {
  //       this.getAllMessages()
  //     }
  //   })
  // }

}
