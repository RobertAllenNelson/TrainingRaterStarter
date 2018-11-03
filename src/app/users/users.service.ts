import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  usersMock = [{ Name: 'Bob Nelson', Role: 'Father' },
  { Name: 'Beth Nelson', Role: 'Mother' },
  { Name: 'Eli Nelson', Role: 'Son' },
  { Name: 'Kai Nelson', Role: 'Son' },
  ];
  constructor() { }

  getUsers(): {}[] {
    return this.usersMock;
  }
}
