import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'bx bx-home-circle',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [],
    roles: ['Admin', 'Client','Staff'],
    module:'Dashboard'
  },
  // {
  //   path: 'enrollments',
  //   title: 'Enrollments',
  //   icon: 'bx bx-list-check',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [],
  //   roles: ['Client'],
  //   module:'Enrollment'
  // },
  // {
  //   path: 'customers',
  //   title: 'Customers',
  //   icon: 'bx bx-user',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [],
  //   roles: ['Client'],
  //   module: 'Customers'
  // },
  {
    path: 'users',
    title: 'Users',
    icon: 'bx bx-user',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [],
    roles: ['Admin'],
    module: 'users'
  },
  // {
  //   path: 'transcribe',
  //   title: 'Transcribe',
  //   icon: 'bx bx-group',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [],
  //   roles: ['Admin', 'Client'],
  //   module: 'Transcript'
  // },
  // {
  //   path: 'queries',
  //   title: 'Queries',
  //   icon: 'bx bx-group',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [],
  //   roles: ['Client'],
  //   module: 'Queries'
  // },
  // {
  //   path: 'jobs/transcribe',
  //   title: 'Jobs',
  //   icon: 'bx bx-walk',
  //   class: 'sub',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [
  //     {
  //       path: 'jobs/transcribe',
  //       title: 'Transcribe',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'Transcript'
  //     },
  //     // {
  //     //   path: 'jobs/queries',
  //     //   title: 'Queries',
  //     //   icon: 'bx bx-right-arrow-alt',
  //     //   class: '',
  //     //   badge: '',
  //     //   badgeClass: '',
  //     //   isExternalLink: false,
  //     //   submenu: [],
  //     //   roles: ['Client'],
  //     //   module: 'Queries'
  //     // },
  //     {
  //       path: 'jobs/employers',
  //       title: 'Employers',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: ''
  //     }
  //     ,{
  //       path: 'jobs/candidates',
  //       title: 'Candidates',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: ''
  //     },
  //     {
  //       path: 'jobs/others',
  //       title: 'Others',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: ''
  //     }
  //   ],
  //   roles: ['Client'],
  //   module: 'Jobs'
  // },

  // {
  //   path: 'publicgrievance/transcribe',
  //   title: 'Public Grievances',
  //   icon: 'bx bx-group',
  //   class: 'sub',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [
  //     {
  //       path: 'publicgrievance/transcribe',
  //       title: 'Transcribe',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'Transcript'
  //     },
  //     {
  //       path: 'publicgrievance/grievances',
  //       title: 'Grievances',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'Grievances'
  //     }
  //   ],
  //   roles: ['Client'],
  //   module: 'PublicGrievance'
  // },
  // {
  //   path: 'customercare/transcribe',
  //   title: 'Customer Care',
  //   icon: 'bx bx-group',
  //   class: 'sub',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [
  //     {
  //       path: 'customercare/transcribe',
  //       title: 'Transcribe',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'CustomerCare'
  //     },
  //     {
  //       path: 'customercare/queries',
  //       title: 'Queries',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'CustomerCare'
  //     }
  //   ],
  //   roles: ['Client'],
  //   module: 'CustomerCare'
  // },
  // {
  //   path: 'realestate/transcribe',
  //   title: 'Real Estate',
  //   icon: 'bx bxs-building-house',
  //   class: 'sub',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [
  //     {
  //       path: 'realestate/transcribe',
  //       title: 'Transcribe',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'RealEstate'
  //     },
  //     {
  //       path: 'realestate/sellers',
  //       title: 'Sellers',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'RealEstate'
  //     },
  //     {
  //       path: 'realestate/buyers',
  //       title: 'Buyers',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'RealEstate'
  //     },
  //     {
  //       path: 'realestate/tenants',
  //       title: 'Tenant',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'RealEstate'
  //     },
  //     {
  //       path: 'realestate/landlords',
  //       title: 'Landlords',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'RealEstate'
  //     }
  //   ],
  //   roles: ['Client'],
  //   module: 'RealEstate'
  // },
  // {
  //   path: 'finance/transcribe',
  //   title: 'Finance',
  //   icon: 'bx bx-money',
  //   class: 'sub',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [
  //     {
  //       path: 'finance/transcribe',
  //       title: 'Transcribe',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'Transcript'
  //     },
  //     {
  //       path: 'finance/queries',
  //       title: 'Queries',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'Queries'
  //     },
  //   ],
  //   roles: ['Client'],
  //   module: 'Finance'
  // },

  // {
  //   path: 'general/transcribe',
  //   title: 'General',
  //   icon: 'bx bx-home',
  //   class: 'sub',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [
  //     {
  //       path: 'general/transcribe',
  //       title: 'Transcribe',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'General'
  //     }
  //   ],
  //   roles: ['Client'],
  //   module: 'General'
  // },
  // {
  //   path: 'ecommerce/transcribe',
  //   title: 'Ecommerce',
  //   icon: 'bx bx-cart',
  //   class: 'sub',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [
  //     {
  //       path: 'ecommerce/transcribe',
  //       title: 'Transcribe',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'Ecommerce'
  //     },
  //     {
  //       path: 'ecommerce/orders',
  //       title: 'Orders',
  //       icon: 'bx bx-right-arrow-alt',
  //       class: '',
  //       badge: '',
  //       badgeClass: '',
  //       isExternalLink: false,
  //       submenu: [],
  //       roles: ['Client'],
  //       module: 'Ecommerce'
  //     }
  //   ],
  //   roles: ['Client'],
  //   module: 'Ecommerce'
  // },
  {
    path: 'inventory',
    title: 'Inventories',
    icon: 'bx bx-box',
    class: 'sub open',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: 'inventory/category',
        title: 'Categories',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
        roles: ['Client'],
        module: 'Inventory'
      },
      {
        path: 'inventory/subcategory',
        title: 'SubCategories',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
        roles: ['Client'],
        module: 'Inventory'
      },
      {
        path: 'inventory/items',
        title: 'Items',
        icon: 'bx bx-right-arrow-alt',
        class: 'sub open',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
          path: 'inventory/items',
          title: 'List Items',
          icon: 'bx bx-right-arrow-alt',
          class: '',
          badge: '',
          badgeClass: '',
          isExternalLink: false,
          submenu: [],
          roles: ['Client'],
          module: 'Items'
        },
        {
          path: 'inventory/items/add',
          title: 'Add Item',
          icon: 'bx bx-right-arrow-alt',
          class: '',
          badge: '',
          badgeClass: '',
          isExternalLink: false,
          submenu: [],
          roles: ['Client'],
          module: 'Items'
        },
        {
          path: 'inventory/items/add/ai',
          title: 'Add Item With AI',
          icon: 'bx bx-right-arrow-alt',
          class: '',
          badge: '',
          badgeClass: '',
          isExternalLink: false,
          submenu: [],
          roles: ['Client'],
          module: 'Items'
        }
      ],
        roles: ['Client'],
        module: 'Items'
      }
    ],
    roles: ['Client'],
    module: 'Inventory'
  },
  // {
  //   path: 'hesaathi',
  //   title: 'Hesaathis',
  //   icon: 'bx bx-group',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [],
  //   roles: ['Client'],
  //   module: 'Hesaathi'
  // },
  // {
  //   path: 'departments',
  //   title: 'Departments',
  //   icon: 'bx bxs-group',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [],
  //   roles: ['Client'],
  //   module: 'Departments'
  // },
  {
    path: 'uploadInventory',
    title: 'Upload Inventory',
    icon: 'bx bx-group',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [],
    roles: ['Client'],
    module: 'uploadInventory'
  },
  // {
  //   path: "staff",
  //   title: 'Staff',
  //   icon: 'bx bx-user',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [],
  //   roles: ['Client'],
  //   module: 'Staff'
  // },

  // {
  //   path: 'messages',
  //   title: 'Messages',
  //   icon: 'bx bxs-message',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: [],
  //   roles: ['Client'],
  //   module: 'Messages'
  // },

];
