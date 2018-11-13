import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface IUser {
  id: number;
  user: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class UsersService {
  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }
}
