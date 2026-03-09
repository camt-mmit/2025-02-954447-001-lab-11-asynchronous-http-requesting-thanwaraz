import { Routes } from '@angular/router';
import { PeopleFetchedListPage } from './pages/people-fetched-list-page/people-fetched-list-page';
import { StarWarsRoot } from './pages/star-wars-root/star-wars-root';
import { PeopleHttpResourceListPage } from './pages/people-http-resource-list-page/people-http-resource-list-page';
import { PeopleListPage } from './pages/people-list-page/people-list-page';
import { PersonViewPage } from './pages/person-view-page/person-view-page';
import { FilmsListPage } from './pages/films-list-page/films-list-page';
import { FilmsViewPage } from './pages/films-view-page/films-view-page';
import { PlanetsListPage } from './pages/planets-list-page/planets-list-page';
import { PlanetsViewPage } from './pages/planets-view-page/planets-view-page';

export default [
  {
    path: '',
    component: StarWarsRoot,
    children: [
      { path: '', redirectTo: 'people', pathMatch: 'full' },

      {
        path: 'people-fetched',
        component: PeopleFetchedListPage,
      },

      {
        path: 'people-http-resource',
        component: PeopleHttpResourceListPage,
      },

      {
        path: 'people',
        children: [
          { path: '', component: PeopleListPage },
          { path: ':id', component: PersonViewPage },
        ],

        // URL = people/id | id = parameter
      },

      {
        path: 'films',
        children: [
          { path: '', component: FilmsListPage },
          { path: ':id', component: FilmsViewPage },
        ],
      },

      {
        path: 'planets',
        children: [
          { path: '', component: PlanetsListPage },
          { path: ':id', component: PlanetsViewPage },
        ],
      },
    ],
  },
] as Routes;
