import { Routes } from "@angular/router";
import { UsersList } from "../../features/user/manage-users/users-list/users-list";
import { UserCreation } from "../../features/user/manage-users/users-list/user-creation/user-creation";
import { pendingChangesGuard } from "../../core/guards/pending-changes-guard";

export const USERS_ROUTES: Routes = [
    { path: '', redirectTo: 'user-list', pathMatch: 'full' },
    { path: 'user-list', component: UsersList, title: 'User List' },
    { path: 'user-creation', component: UserCreation, title: 'User Creation', canDeactivate: [pendingChangesGuard] },
    { path: 'user-edit/:id', component: UserCreation, title: 'User Creation' },
]