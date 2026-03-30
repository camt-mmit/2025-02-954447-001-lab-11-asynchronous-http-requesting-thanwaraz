import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { form } from '@angular/forms/signals';
import {
  ContactInsertSchema,
  toContactInsertModel,
  toGooglePersonInsertResource,
} from '../../helpers';
import { PeopleFieldTree } from '../../components/people-field-tree/people-field-tree';

@Component({
  selector: 'app-people-insert-page',
  standalone: true,
  imports: [PeopleFieldTree],
  templateUrl: './people-insert-page.html',
  styleUrl: './people-insert-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleInsertPage {
  private readonly service = inject(PeopleService);

  // ✅ ใช้ signal + form
  protected fieldTree = form(
    signal(toContactInsertModel()),
    ContactInsertSchema
  );

  // ✅ submit แบบไม่ใช้ submission
  protected async onSubmit() {
    const value = this.fieldTree().value();

    const requestBody = toGooglePersonInsertResource(value);

    await this.service.insertContact({
      requestBody,
      personFields: 'names,emailAddresses,phoneNumbers',
    });

    history.back();
  }

  protected cancel(): void {
    history.back();
  }
}