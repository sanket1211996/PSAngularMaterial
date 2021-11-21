import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[]>;

  private dataStore!: {
    users: User[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { users:[] };
    this._users =  new BehaviorSubject<User[]>([]); //Empty initilization of behavioural subject.
  }

  loadAll() {
    const userUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(userUrl)
      .subscribe( data => {
        this.dataStore.users = data;
      }, error => {
        console.log('error fectching user data.');
      });
  }

  getUsers(): Observable<User[]> {
    return this._users.asObservable();
  }
}
