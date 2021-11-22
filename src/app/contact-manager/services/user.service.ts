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
        //Dont return our datastore return just a copy of datastore users
        // object so that component cannot directly manipulate it.
        //.next method will update our subcribed component about the availablity of data
        this._users.next(Object.assign({},this.dataStore).users);

      }, error => {
        console.log('error fectching user data.');
      });
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  userByid(id: number) {
    return this.dataStore.users.find( x => x.id == id);
  }

}
