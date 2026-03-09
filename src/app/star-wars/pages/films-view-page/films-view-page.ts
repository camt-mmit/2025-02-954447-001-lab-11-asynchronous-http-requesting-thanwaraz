import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FilmsView } from '../../components/films-view/films-view';
import { ModuleRoute } from '../../tokens';
import { filmResource } from '../../helpers';

@Component({
  selector: 'app-films-view-page',
  imports: [FilmsView],
  templateUrl: './films-view-page.html',
  styleUrl: './films-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsViewPage {
  readonly id = input.required<string>();

  protected moduleRoute = inject(ModuleRoute);

  protected readonly dataResource = filmResource(() => this.id());

  protected goBack(): void {
    history.back();
  }
}
