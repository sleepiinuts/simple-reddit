import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../states/article/article.reducer';
import { Article } from '../models/articles';
import { ArticleActions } from '../states/article/article.actions';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  protected readonly value = signal('');
  protected subForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<{ articles: State }>) {}

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected onSubmit() {
    let article = <Article>{
      title: this.subForm.value.title,
      url: this.subForm.value.url,
      point: 0,
    };

    this.store.dispatch(ArticleActions.newArticle({ data: article }));
  }
}
