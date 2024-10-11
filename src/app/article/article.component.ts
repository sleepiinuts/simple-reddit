import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from './article.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Article } from '../models/articles';
import { Store } from '@ngrx/store';
import { ArticleActions } from '../states/article/article.actions';
import { articleFeatureKey } from '../states/article/article.reducer';

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
    private store: Store<{ articles: Article[] }>
  ) {
    this.articleServ
      .getAll()
      .pipe(takeUntilDestroyed())
      .subscribe((articles) => {
        this.articles = articles;
      });

    this.store.dispatch(ArticleActions.getAllSuccess({ data: this.articles }));
    this.store
      .select(articleFeatureKey)
      .subscribe((articles) =>
        console.log('statezz: ', JSON.stringify(articles))
      );
  }

  ngOnInit(): void {
    // this.articleServ.getAll();
  }
}
