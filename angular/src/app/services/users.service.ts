import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IUsers } from "../models/users.model";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    http = inject(HttpClient);
    baseUrl = 'http://localhost:5000/api/';

    getUsers(): Observable<IUsers[]> {
        return this.http.get<IUsers[]>(this.baseUrl + '/account/login');
    }
}