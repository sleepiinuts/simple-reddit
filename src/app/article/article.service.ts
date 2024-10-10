import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from '../models/articles';
import { ArticleActions } from '../states/article/article.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  static readonly url = 'http://localhost:3000/articles';
  constructor(
    private store: Store<{ articles: Article[] }>,
    private httpClient: HttpClient
  ) {}

  getAll(): Observable<Article[]> {
    this.store.dispatch(ArticleActions.getAllSuccess({ data: [] }));
    return this.httpClient
      .get<Article[]>(ArticleService.url)
      .pipe(catchError((err) => of(err)));
  }
}