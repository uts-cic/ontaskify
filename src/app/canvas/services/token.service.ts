import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly storageKey = 'canvas_token';
  private token$: BehaviorSubject<string | null>;

  constructor() {
    const storedToken = sessionStorage.getItem(this.storageKey);
    this.token$ = new BehaviorSubject<string | null>(storedToken);
    this.token$.subscribe((token) =>
      token
        ? sessionStorage.setItem(this.storageKey, token)
        : sessionStorage.removeItem(this.storageKey)
    );
  }

  setToken(token: string) {
    console.log(token);
    this.token$.next(token);
  }

  clearToken() {
    this.token$.next(null);
  }

  getTokenAsObservable() {
    return this.token$.asObservable();
  }

  getToken() {
    return this.token$.getValue();
  }
}
