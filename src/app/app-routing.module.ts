import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NotFoundPage } from '@containers/not-found/not-found.page';
import { AuthGuard, NoAuthGuard } from '@core/guards';
import { Path } from '@core/structs';

const routes: Routes = [
  // ===== Uncomment if Path.Home is different from empty =====
  // { path: '', redirectTo: Path.Home, pathMatch: 'full' },

  // Public
  {
    path: Path.Public,
    loadChildren: () =>
      import('@containers/contest/contest.module').then((m) => m.ContestModule),
  },
  {
    path: Path.Home,
    loadChildren: () =>
      import('@containers/contest/contest.module').then((m) => m.ContestModule),
  },

  {
    path: Path.Contest,
    loadChildren: () =>
      import('@containers/contest/contest.module').then((m) => m.ContestModule),
  },

  {
    path: Path.Subject,
    loadChildren: () =>
      import('@containers/subject/subject.module').then((m) => m.SubjectModule),
  },

  {
    path: Path.Section,
    loadChildren: () =>
      import('@containers/section/section.module').then((m) => m.SectionModule),
  },

  {
    path: Path.Post,
    loadChildren: () =>
      import('@containers/post/post.module').then((m) => m.PostModule),
  },

  // Auth
  {
    path: Path.Auth,
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./+auth/auth.module').then((m) => m.AuthModule),
  },

  // App
  {
    path: Path.App,
    redirectTo: `${Path.App}`,
    pathMatch: 'full',
  },
  {
    path: Path.App,
    canActivate: [AuthGuard],
    children: [
      {
        path: Path.Dashboard,
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule,
          ),
      },
    ],
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./+settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./+user/user.module').then((m) => m.UserModule),
  },

  // Not found page (must go at the bottom)
  {
    path: '**',
    loadChildren: () =>
      import('@containers/not-found/not-found.module').then(
        (m) => m.NotFoundModule,
      ),
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
