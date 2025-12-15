import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                loadComponent: () => import('../../../app/features/auth/login/login').then(m => m.Login)
            },
            {
                path: 'register',
                loadComponent: () => import('../../features/user/manage-users/users-list/user-creation/user-creation').then(m => m.UserCreation)
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];
