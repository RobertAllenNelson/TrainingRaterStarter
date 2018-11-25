import { Component, OnInit } from '@angular/core';

import { UsersService, IUser } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: IUser[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(
        (users) => {
        this.users = users;
        });
  }

  goToAdd(): void {
    this.router.navigate(['users/add']);
  }

  goToEdit(id: number): void {
    this.router.navigate([`users/${id}`]);
  }

}

