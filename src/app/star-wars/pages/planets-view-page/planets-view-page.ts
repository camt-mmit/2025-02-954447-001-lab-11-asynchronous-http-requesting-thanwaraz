import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { planetResource } from '../../helpers';
import { ModuleRoute } from '../../tokens';
import { PlanetView } from '../../components/planet-view/planet-view';

@Component({
  selector: 'app-planets-view-page',
  imports: [PlanetView],
  templateUrl: './planets-view-page.html',
  styleUrl: './planets-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsViewPage {
  readonly id = input.required<string>();

  protected moduleRoute = inject(ModuleRoute);

  protected readonly dataResource = planetResource(() => this.id());

  protected goBack(): void {
    history.back();
  }
}
