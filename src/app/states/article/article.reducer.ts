import { createReducer, on } from '@ngrx/store';
import { ArticleActions } from './article.actions';
import { Article } from '../../models/articles';

export const articleFeatureKey = 'articles';

export interface State {
  articles: Article[];
}

export const initialState: State = {
  articles: [],
};

export const reducer = createReducer(
  initialState,
  on(ArticleActions.getAllSuccess, (state, { data }) => ({
    ...state,
    articles: [...data],
  }))
);
