import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  Resource,
  resource,
} from '@angular/core';
import { Film, Person, Planet } from '../../types';
import { AsyncPipe, DatePipe } from '@angular/common';
import { fetchResource } from '../../helpers';
import { httpResource } from '@angular/common/http';
import { applyEach, createManagedMetadataKey, form, metadata } from '@angular/forms/signals';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';

@Component({
  selector: 'app-person-view',
  imports: [DatePipe, AsyncPipe, RouterLink, ExtractIdPipe],
  templateUrl: './person-view.html',
  styleUrl: './person-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonView {
  readonly data = input.required<Person>();

  protected readonly homeworld$ = computed(() => fetchResource<Planet>(this.data().homeworld));
  // $ = ประกาศว่าเป้น asynchronus ใช้ได้กับพวก promise / RxJs

  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly homeworldResource = resource({
    params: () => this.data().homeworld,
    loader: async ({ params }) => fetchResource<Planet>(params),
  });

  protected readonly homeworldHttpResource = httpResource<Planet>(() =>
    this.data().homeworld
      ? {
          url: this.data().homeworld!,
          cache: 'force-cache',
        }
      : undefined,
  );

  protected readonly asyncData = computed(() => ({
    films$: this.data().films.map((item) => fetchResource<Film>(item)),
  }));

  protected readonly resourceData = {
    films: resource({
      params: () => this.data().films,
      loader: async ({ params }) =>
        await Promise.all(params.map((item) => fetchResource<Film>(item))),
    }),
  } as const;

  protected readonly filmResourceKey = createManagedMetadataKey<Resource<Film | undefined>, string>(
    // Note: Memory Leak
    (url) => httpResource<Film>(url),
  );

  protected readonly form = form(
    linkedSignal(
      () =>
        ({
          films: this.data().films,
        }) as const,
    ),
    (path) => {
      applyEach(path.films, (eachPath) => {
        metadata(eachPath, this.filmResourceKey, ({ value }) => value());
      });
    },
  );
}
