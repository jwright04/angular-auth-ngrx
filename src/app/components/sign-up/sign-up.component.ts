import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../store/app.states';
import {SignUp} from '../../store/actions/auth.actions';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public user: User = {
    email: null,
    password: null
  };

  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload: User = {
      email: this.user.email,
      password: this.user.password,
    };
    this.store.dispatch(new SignUp(payload));
  }

}
