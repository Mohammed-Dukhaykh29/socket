import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private http: HttpClient, private fb: FormBuilder, private routers: Router) { }

  ngOnInit(): void {
    this.Init_login()
  }

  Init_login() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", Validators.required]
    })
  }

  handleLogin() {
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }
    this.http.post("/api/login", body).subscribe({
      next: (res: any) => {
        this.routers.navigate(["/home"])
        localStorage.setItem("SocketStrorage", JSON.stringify(res))
      }
    })
  }

}
