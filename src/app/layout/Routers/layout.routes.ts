import { Routes } from "@angular/router";
import { Layout } from "../layout/layout";


export const layoutRoutes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            {
                path: 'user',
                loadChildren: () => import('../../features/user/users.routes').then(m => m.USERS_ROUTES)
            },
            {
                path: 'gallery',
                loadChildren: () => import('../../features/gallery/gallery.routes').then(m => m.GalleryRoute)
            }
        ]
    }
]