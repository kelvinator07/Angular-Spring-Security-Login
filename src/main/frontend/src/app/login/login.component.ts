import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: any = {};

  constructor(private  route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
      sessionStorage.setItem('token', '');
  }

  login() {
      let url = 'http://localhost:8082/login';
      this.http.post<Observable<boolean>>(url, {
          userName: this.model.username,
          password: this.model.password
      }).subscribe(isValid => {
          if (isValid) {
              sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
              this.router.navigate(['']);
          } else {
              alert("Authentication Failed.");
          }
      });
  }
}
