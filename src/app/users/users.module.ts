import { NgModule } from '@angular/core';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        UsersListComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        UsersService,
    ],
})
export class UsersModule { }
