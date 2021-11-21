import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataStore!: {
    users: User[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { users:[] };
   }
}
