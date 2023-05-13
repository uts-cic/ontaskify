import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly storageKey = 'canvas_token';

  public token = signal<string | null>(
    sessionStorage.getItem(this.storageKey) || null
  );

  constructor() {
    effect(() => {
      const token = this.token();
      if (token) {
        sessionStorage.setItem(this.storageKey, token);
      } else {
        sessionStorage.removeItem(this.storageKey);
      }
    });
  }

  // setToken(token: string) {
  //   this.token.set(token);
  // }

  // clearToken() {
  //   this.token.set(null);
  // }

  // getTokenAsObservable() {
  //   return toObservable(this.token);
  // }

  // getToken() {
  //   return this.token();
  // }
}
