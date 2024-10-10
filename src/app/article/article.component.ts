import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from './article.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Article } from '../models/articles';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, MatIconModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  articles = <Article[]>[];

  constructor(private articleServ: ArticleService) {
    this.articleServ
      .getAll()
      .pipe(takeUntilDestroyed())
      .subscribe((articles) => {
        this.articles = articles;
      });
  }

  ngOnInit(): void {
    // this.articleServ.getAll();
  }
}
