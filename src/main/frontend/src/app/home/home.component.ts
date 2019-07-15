import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {throwError} from "rxjs/internal/observable/throwError";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    username: string;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        let url = 'http://localhost:8082/user';

        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + sessionStorage.getItem('token')
        });

        let options = {headers: headers};
        this.http.post<Observable<Object>>(url, {}, options).subscribe(
            principal => {
                this.username = principal['name'];
            },
            error => {
                if (error.status == 401)
                    alert('Unauthorized');
            }
        );
    }

    logout() {
        sessionStorage.setItem('token', '');
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An Error Occurred: ', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            `Something bad happened; please try again later.`);
    };

}
