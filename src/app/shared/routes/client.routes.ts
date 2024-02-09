import { Routes } from '@angular/router';
import { ModuleGuard } from '../guard/module.guard';

export const Client_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full',
  },
  {
    path: 'error',
    data: { title: 'Error' },
    loadChildren: () =>
      import('@app/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'dashboard',
    data: { title: 'Dashboard', module: 'Dashboard' },
    loadChildren: () =>
      import('@app/clients/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  // {
  //   path: "customercare",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Customer Care', module: 'CustomerCare' },
  //   loadChildren: () =>
  //     import('@app/clients/customercare/customer.module').then(
  //       (m) => m.CustomerCareModule
  //     )
  // },
  // {
  //   path: "jobs",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Jobs', module: 'Jobs' },
  //   loadChildren: () =>
  //     import('@app/clients/jobs/jobs.module').then(
  //       (m) => m.JobsModule
  //     )
  // },
  // {
  //   path: "finance",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Finance', module: 'Finance' },
  //   loadChildren: () =>
  //     import('@app/clients/finance/finance.module').then(
  //       (m) => m.FinanceModule
  //     )
  // },
  // {
  //   path: "general",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'General', module: 'General' },
  //   loadChildren: () =>
  //     import('@app/clients/general/general.module').then(
  //       (m) => m.GeneralModule
  //     )
  // },
  // {
  //   path: "ecommerce",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Ecommerce', module: 'Ecommerce' },
  //   loadChildren: () =>
  //     import('@app/clients/ecommerce/ecommerce.module').then(
  //       (m) => m.CommerceModule
  //     )
  // },
  // {
  //   path: "customers",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Customers', module: 'Customers' },
  //   loadChildren: () =>
  //     import('@app/clients/customers/customer.module').then(
  //       (m) => m.CustomerModule
  //     )
  // },
  {
    path: "inventory",
    canActivate: [ModuleGuard],
    data: { title: 'Inventory', module: 'Inventory' },
    loadChildren: () =>
      import('@app/clients/inventories/inventory.module').then(
        (m) => m.InventoryModule
      )
  },
  // {
  //   path: "hesaathi",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Hesaathi', module: 'Inventory' },
  //   loadChildren: () =>
  //     import('@app/clients/hesaathis/hesaathi.module').then(
  //       (m) => m.HesaathiModule
  //     )
  // },
  // {
  //   path: "staff",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Staff', module: 'Staff' },
  //   loadChildren: () => import('@app/clients/staff/staff.module').then(
  //     (m) => m.StaffModule
  //   )
  // },
  // {
  //   path: "publicgrievance",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Public Grievances', module: 'PublicGrievance' },
  //   loadChildren: () =>
  //     import('@app/clients/publicgrievances/publicgrievances.module').then(
  //       (m) => m.PublicgrievancesModule
  //     )
  // },
  // {
  //   path: "messages",
  //   loadChildren: () =>
  //     import('@app/clients/interakt/interakt.module').then(
  //       (m) => m.InteraktModule
  //     )
  // },
  // {
  //   path:"departments",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Departments', module: 'Departments' },
  //   loadChildren: () =>
  //   import('@app/clients/department/department.module').then(
  //     (m) => m.DepartmentModule
  //   )
  // },
  // {
  //   path: "realestate",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'RealEstate', module: 'RealEstate' },
  //   loadChildren: () =>
  //     import('@app/clients/realEstate/realEstate.module').then(
  //       (m) => m.RealEstateModule
  //     )
  // },
  // {
  //   path: "enrollments",
  //   canActivate: [ModuleGuard],
  //   data: { title: 'Enrollment', module: 'Enrollment' },
  //   loadChildren: () =>
  //     import('@app/clients/enrollments/enrollment.module').then(
  //       (m) => m.EnrollmentModule
  //     )
  // },
  {
    path: "uploadInventory",
    canActivate: [ModuleGuard],
    data: { title: 'uploadInventory', module: 'uploadInventory' },
    loadChildren: () =>
      import('@app/clients/uploadInventory/uploadInventory.module').then(
        (m) => m.UploadInventoryModule
      )
  }
];
