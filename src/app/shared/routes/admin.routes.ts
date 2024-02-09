import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

//Route for content layout with sidebar, navbar and footer.

export const Admin_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'error',
    data: { title: 'Error', expectedRole: 'Admin' },
    loadChildren: () =>
      import('../../error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    data: { title: 'Dashboard', expectedRole: 'Admin' },
    loadChildren: () =>
      import('../../admin/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'notification',
    canActivate: [AuthGuard],
    data: { title: 'Notification', expectedRole: 'Admin' },
    loadChildren: () =>
      import('../../admin/notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    data: { title: 'Users', expectedRole: 'Admin' },
    loadChildren: () =>
      import('../../admin/users/users.module').then(
        (m) => m.UsersModule
      ),
  },
  {
    path: 'setting/discount',
    canActivate: [AuthGuard],
    data: { title: 'Discount', expectedRole: 'Admin' },
    loadChildren: () =>
      import('../../admin/settings/discount/discount.module').then(
        (m) => m.DiscountModule
      ),
  },
   {
    path:'enquiry',
    canActivate:[AuthGuard],
    data:{title:'Enquiry',expectedRole:'Admin'},
    loadChildren:()=>import('../../admin/enquiry/enquiry.module').then(
      (m) => m.EnquiryModule
    )
   }
];
