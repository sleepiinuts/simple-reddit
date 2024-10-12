import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticleActions } from '../states/article/article.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/articles';

@Injectable()
export class ArticleEffects {
  // TO-DO: make url in one place
  static readonly url = 'http://localhost:8080/articles';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // workaround for typescript inject gone wrong!?
  actions$ = inject(Actions);

  constructor(private httpClient: HttpClient) {}

  newArticle = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.newArticle),
      exhaustMap((props) =>
        this.httpClient
          .post<Article>(ArticleEffects.url, props.data, this.httpOptions)
          .pipe(
            map(() => ArticleActions.getAll()),
            catchError(() => of(ArticleActions.newArticleFailure))
          )
      )
    );
  });
}
