import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerComponent as CustomerLayout } from "./layout/customer/customer.component";
import { MessageComponent } from './pages/message/message.component';
import { MessageFormComponent } from './pages/message/message-form/message-form.component';
import { CustomerFormComponent } from './pages/customer/customer-form/customer-form.component';
import { CustomerListComponent } from './pages/customer/customer-list/customer-list.component';
import { ChargerCustomersComponent } from './pages/customer/charger-customers/charger-customers.component';
import { FileUploadComponent } from './pages/customer/charger-customers/file-upload/file-upload.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomerLayout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'messages',
        component: MessageComponent
      },
      {
        path: 'messages/create',
        component: MessageFormComponent
      },
      {
        path: 'messages/edit/:id',
        component: MessageFormComponent
      },
      {
        path: 'customers',
        component: CustomerComponent
      },
      {
        path: 'customers/list',
        component: CustomerListComponent
      },
      {
        path: 'customers/upload/multiple',
        component: ChargerCustomersComponent
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ],
  },
];
