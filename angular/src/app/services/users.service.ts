import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUsers } from "../models/users.model";
import { BaseService } from "./base.service";


@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    
    getUsers(): Observable<IUsers[]> {
        return this.http.get<IUsers[]>(this.baseUrl + '/account/login');
    }
}