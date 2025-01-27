import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../../models/articles';

export const ArticleActions = createActionGroup({
  source: 'Article',
  events: {
    'Get All': emptyProps(),
    'Get All Success': props<{ data: Article[] }>(),
    'Get All Failure': props<{ error: unknown }>(),
    'New Article': props<{ data: Article }>(),
    'New Article Failure': props<{ error: unknown }>(),
    'Delete Article': props<{ data: number }>(),
    'Delete Article Failure': props<{ error: unknown }>(),
    'Vote Article': props<{ data: { id: number; vote: number } }>(),
    'Vote Article Failure': props<{ error: unknown }>(),
  },
});

// get all
// new article
// upvote
// downvote
