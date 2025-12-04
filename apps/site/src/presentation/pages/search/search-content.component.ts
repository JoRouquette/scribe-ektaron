import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SearchFacade } from '../../../application/facades/search-facade';

@Component({
  standalone: true,
  selector: 'app-search-content',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchContentComponent implements OnInit {
  hasResults = computed(() => this.search.results().length > 0);

  constructor(
    private readonly route: ActivatedRoute,
    public readonly search: SearchFacade
  ) {}

  ngOnInit(): void {
    this.search.ensureIndex().catch(() => undefined);

    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const q = params.get('q') ?? '';
      this.search.setQuery(q);
      if (q.trim().length >= 3) {
        this.search.ensureIndex().catch(() => undefined);
      }
    });
  }

  trackMatch(_: number, item: { sentence: string }) {
    return item.sentence;
  }

  routeLink(route: string): string {
    if (!route) return '/';
    return route.startsWith('/') ? route : '/' + route;
  }
}
