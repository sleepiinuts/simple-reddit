import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from './article.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Article } from '../models/articles';
import { Store } from '@ngrx/store';
import { articleFeatureKey, State } from '../states/article/article.reducer';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, MatIconModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  articles = <Article[]>[];

  constructor(
    private articleServ: ArticleService,
    private store: Store<{ articles: State }>
  ) {
    this.store
      .select(articleFeatureKey)
      .pipe(takeUntilDestroyed())
      .subscribe((state) => (this.articles = state.articles));
    this.articleServ.getAll();
  }

  ngOnInit(): void {
    // this.articleServ.getAll();
  }
}
