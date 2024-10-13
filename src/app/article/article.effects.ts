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

  getAll = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.getAll),
      exhaustMap(() =>
        this.httpClient.get<Article[]>(ArticleEffects.url).pipe(
          map((articles) => ArticleActions.getAllSuccess({ data: articles })),
          catchError(() => of(ArticleActions.getAllFailure))
        )
      )
    );
  });

  deleteById = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      exhaustMap((props) =>
        this.httpClient.delete(`${ArticleEffects.url}/${props.data}`).pipe(
          map(() => ArticleActions.getAll()),
          catchError(() => of(ArticleActions.deleteArticleFailure))
        )
      )
    );
  });

  vote = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.voteArticle),
      exhaustMap((props) =>
        this.httpClient
          .patch(
            `${ArticleEffects.url}/${props.data.id}`,
            props.data.vote,
            this.httpOptions
          )
          .pipe(
            map(() => ArticleActions.getAll()),
            catchError(() => of(ArticleActions.voteArticleFailure))
          )
      )
    );
  });
}
