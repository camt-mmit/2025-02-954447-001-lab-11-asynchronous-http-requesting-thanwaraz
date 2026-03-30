import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { GoogleCalendarEvent, GoogleCalendarEventsListRequest } from '../../types/google/calendar';
import { RouterLink } from '@angular/router';
import { EventsList } from "../../components/events-list/events-list";

const defaulQueryParams: GoogleCalendarEventsListRequest = {
  calendarId: 'primary',
  maxResults: 25,
  singleEvents: true,
  eventTypes: ['default'],
  orderBy: 'startTime',
};

// ✅ เพิ่ม type ใหม่ (สำคัญมาก)
type EventParams = GoogleCalendarEventsListRequest & {
  q?: string;
  pageToken?: string;
};

@Component({
  selector: 'app-events-list-page',
  standalone: true,
  imports: [EventsList, RouterLink],
  templateUrl: './events-list-page.html',
  styleUrl: './events-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListPage {
  private readonly service = inject(CalendarService);

  // ✅ state
  protected readonly searchText = signal('');
  protected readonly pageToken = signal<string | null>(null);

  protected readonly params = computed(() => {
  const base = { ...defaulQueryParams };

  if (this.searchText()) {
    (base as any).q = this.searchText();
  }

  if (this.pageToken()) {
    (base as any).pageToken = this.pageToken();
  }

  return base;
});

  // ✅ ยิง API ใหม่ทุกครั้งที่ params เปลี่ยน
  protected readonly resource = this.service.eventResource(
    () => this.params() as any
  );

  // ✅ list
  protected readonly items = computed(() => {
    return this.resource.value()?.items ?? [];
  });

  // ✅ Enter
  protected onSubmit(event?: Event) {
    event?.preventDefault();
  }

  // ✅ พิมพ์ → search ทันที
  protected onInput(value: string) {
    this.searchText.set(value);
    this.pageToken.set(null); // reset pagination
  }

  // ✅ ล้าง search
  protected clearSearch() {
    this.searchText.set('');
    this.pageToken.set(null);
  }

  // ✅ load more
  loadMore(pageToken: string): void {
    this.pageToken.set(pageToken);
  }
}