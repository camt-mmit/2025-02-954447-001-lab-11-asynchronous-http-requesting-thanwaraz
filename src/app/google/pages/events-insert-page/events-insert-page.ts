import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { form } from '@angular/forms/signals';
import {
  CalendarEventInsertSchema,
  toCalendarEventnsertModel,
  toGoogleCalendarEventInsertResource,
} from '../../helpers';
import { EventsFieldTree } from '../../components/events-field-tree/events-field-tree';

@Component({
  selector: 'app-events-insert-page',
  standalone: true,
  imports: [EventsFieldTree],
  templateUrl: './events-insert-page.html',
  styleUrl: './events-insert-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsInsertPage {
  private readonly service = inject(CalendarService);

  // ✅ ใช้ signal + form (ยังตรง requirement)
  protected fieldTree = form(
    signal(toCalendarEventnsertModel()),
    CalendarEventInsertSchema
  );

  // ✅ submit แบบตรงๆ (ไม่ใช้ submission)
  protected async onSubmit() {
    const value = this.fieldTree().value();

    const requestBody = toGoogleCalendarEventInsertResource(value);

    await this.service.insertEvent(
      {
        calendarId: 'primary',
        requestBody,
      },
      requestBody
    );

    history.back();
  }

  protected cancel(): void {
    history.back();
  }
}