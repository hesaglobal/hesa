import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { Admin_ROUTES } from "./shared/routes/admin.routes";
import { Client_ROUTES } from "./shared/routes/client.routes";
import { AuthGuard } from './shared/guard/auth.guard';
import { ClientGuard } from './shared/guard/client.guard';
import { UploadMessageComponent } from './view/uploadmessage/uploadmessage.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
    // component: ContentLayoutComponent,
    // loadChildren: () => import("./public/public.module").then(m => m.PublicModule)
  },
  {
    path: 'auth',
    component: ContentLayoutComponent,
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "admin",
    component: FullLayoutComponent,
    children: Admin_ROUTES,
    canActivate: [AuthGuard]
  },
  {
    path: "client",
    component: FullLayoutComponent,
    children: Client_ROUTES,
    // canActivate: [ClientGuard] // [ClientGuard, ModuleGuard]
  },
  {
    path:"view/:userId/uploadaudio",
    component:UploadMessageComponent,
    loadChildren: () =>
    import('@app/view/view.module').then(
      (m) => m.ViewModule
    )
  },
  {
    path: '**',
    redirectTo: '/client/error/error-404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
