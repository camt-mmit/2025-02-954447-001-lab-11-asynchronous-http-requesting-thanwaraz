import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { Film, Person, Planet } from '../../types';
import { fetchResource } from '../../helpers';

@Component({
  selector: 'app-films-view',
  imports: [DatePipe, AsyncPipe, RouterLink, ExtractIdPipe],
  templateUrl: './films-view.html',
  styleUrl: './films-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsView {
  readonly data = input.required<Film>();

  protected readonly characters$ = computed(() =>
    this.data().characters.map((url) => fetchResource<Person>(url)),
  );

  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly charactersResource = resource({
    params: () => this.data().characters,
    loader: async ({ params }) =>
      await Promise.all(params.map((url) => fetchResource<Person>(url))),
  });

  protected readonly planetsResource = resource({
    params: () => this.data().planets,
    loader: async ({ params }) =>
      await Promise.all(params.map((url) => fetchResource<Planet>(url))),
  });
}
