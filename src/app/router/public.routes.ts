import { Routes } from '@angular/router';
import { NoAuthGuard } from '@app/@core/guards';
import { Path } from '@app/@core/structs';

export const PUBLIC_ROUTES: Routes = [
  // Public
  {
    path: Path.Public,
    loadChildren: () =>
      import('@app/containers/contest/contest.module').then(
        (m) => m.ContestModule,
      ),
  },
  {
    path: Path.Home,
    loadChildren: () =>
      import('@app/containers/contest/contest.module').then(
        (m) => m.ContestModule,
      ),
  },

  {
    path: Path.Contest,
    loadChildren: () =>
      import('@app/containers/contest/contest.module').then(
        (m) => m.ContestModule,
      ),
  },

  {
    path: Path.Part,
    loadChildren: () =>
      import('@app/containers/part/part.module').then((m) => m.PartModule),
  },

  {
    path: Path.Subject,
    loadChildren: () =>
      import('@app/containers/subject/subject.module').then(
        (m) => m.SubjectModule,
      ),
  },

  {
    path: Path.Section,
    loadChildren: () =>
      import('@app/containers/section/section.module').then(
        (m) => m.SectionModule,
      ),
  },

  {
    path: Path.Exam,
    loadChildren: () =>
      import('@app/containers/exam/exam.module').then((m) => m.ExamModule),
  },

  {
    path: Path.Post,
    loadChildren: () =>
      import('@app/containers/post/post.module').then((m) => m.PostModule),
  },

  // Auth
  {
    path: Path.Auth,
    canActivate: [NoAuthGuard],
    children: [
      {
        path: Path.SignIn,
        loadChildren: () =>
          import('../pages/public/auth/sign-in/sign-in.module').then(
            (m) => m.SignInModule,
          ),
      },
      {
        path: Path.SignUp,
        loadChildren: () =>
          import('../pages/public/auth/sign-up/sign-up.module').then(
            (m) => m.SignUpModule,
          ),
      },
    ],
  },

  // App
  {
    path: Path.App,
    redirectTo: `${Path.App}`,
    pathMatch: 'full',
  },
];
