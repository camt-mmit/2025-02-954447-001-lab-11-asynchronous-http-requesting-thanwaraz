import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { Film, Person, Planet } from '../../types';
import { fetchResource } from '../../helpers';

@Component({
  selector: 'app-planet-view',
  imports: [DatePipe, AsyncPipe, RouterLink, ExtractIdPipe],
  templateUrl: './planet-view.html',
  styleUrl: './planet-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetView {
  readonly data = input.required<Planet>();

  protected readonly residents$ = computed(() =>
    this.data().residents.map((url) => fetchResource<Person>(url)),
  );

  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly residentsResource = resource({
    params: () => this.data().residents,
    loader: async ({ params }) =>
      await Promise.all(params.map((url) => fetchResource<Person>(url))),
  });

  protected readonly filmsResource = resource({
    params: () => this.data().films,
    loader: async ({ params }) => await Promise.all(params.map((url) => fetchResource<Film>(url))),
  });
}
