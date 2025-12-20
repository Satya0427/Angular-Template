import { Routes } from "@angular/router";
import { ViewGallery } from "./view-gallery/view-gallery";

export const GalleryRoute: Routes = [
    { path: 'images-view', component: ViewGallery },
    { path: '', redirectTo: 'images-view', pathMatch: 'full' },

]