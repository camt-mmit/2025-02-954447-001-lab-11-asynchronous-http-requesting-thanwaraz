import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { GooglePerson } from '../../types/google/people';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-people-list-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './people-list-page.html',
  styleUrl: './people-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListPage {
  private readonly service = inject(PeopleService);

  // ✅ ใช้ signal แทน form
  protected readonly searchText = signal('');

  protected readonly resource = this.service.connectionsResource(() => ({
    personFields: 'names,emailAddresses,phoneNumbers,photos',
    pageSize: 100,
  }));

  protected readonly filteredContacts = computed(() => {
    const connections = this.resource.value()?.connections ?? [];

    const searchTerm = this.searchText().toLowerCase();

    if (!searchTerm) {
      return connections;
    }

    return connections.filter((person: GooglePerson) => {
      const matchName = person.names?.some(n =>
        n.displayName?.toLowerCase().indexOf(searchTerm) !== -1
      );

      const matchEmail = person.emailAddresses?.some(e =>
        e.value?.toLowerCase().indexOf(searchTerm) !== -1
      );

      return matchName || matchEmail;
    });
  });

  // ✅ input handler
  protected onInput(value: string) {
    this.searchText.set(value);
  }

  protected onSubmit(event?: Event) {
    event?.preventDefault();
  }

  // ✅ clear search
  protected clearSearch() {
    this.searchText.set('');
  }
}