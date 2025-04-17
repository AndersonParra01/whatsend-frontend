import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'messages/edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'messages/send-message/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'branches',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'messages',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'historical-messages',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'customers/upload/multiple',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'customers/list',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'messages/create',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
