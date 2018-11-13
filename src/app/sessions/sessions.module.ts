import { NgModule } from '@angular/core';

import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { SessionsService } from './sessions.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SessionsListComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        SessionsService,
    ],
})
export class SessionsModule { }
