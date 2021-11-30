import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  addUser(user: User) {
    return new Promise<User>((resolver,reject) => {
      user.id = this.dataStore.users.length + 1;
      //Push new user to our local datastore
      this.dataStore.users.push(user);
      // Notify all the subscribing componenets about the change
      this._users.next(Object.assign({},this.dataStore).users);
      resolver(user);
      // we can also send reject back if service unable to process data.
      //reject(user);
    })
  }

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
