import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, UsersService } from '../users.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
    templateUrl: './user-detail.component.html',
})
export class UsersDetailComponent implements OnInit {

    user: IUser;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService,
        private toastsManager: ToastsManager,
    ) { }

    ngOnInit() {
        let id: string | number = this.route.snapshot.paramMap.get('userId');
        // tslint:disable-next-line:radix
        id = isNaN(parseInt(id)) ? 0 : parseInt(id);
        if (id > 0) {
            // get from db
            this.usersService.getUserById(id)
                .subscribe((user) => {
                    this.user = user;
                });
        } else {
            // new
            this.user = {
                id: 0,
                first: '',
                last: '',
                email: '',
                phone: '',
                isTrainer: false,
                aboutMe: '',
                password: '',
                createdAt: '',
                updatedAt: '',
            };
        }
    }

    save(): void {
        if (!this.formValid()) {
            this.toastsManager.error('Form invalid');
            return;
        }
        this.usersService.save(this.user)
            .subscribe((user) => {
                this.toastsManager.success('User saved');
                this.router.navigate(['users']);
            });
    }

    private formValid(): boolean {
        return this.user.first && this.user.last 
        && this.user.email
        && this.user.password
         ? true : false;
    }

    cancel(): void {
        this.router.navigate(['users']);
    }

}
