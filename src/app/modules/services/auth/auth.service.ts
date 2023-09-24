import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userNameKey = 'userName';

  constructor() { }

  setUserName(userName: string): void {
    localStorage.setItem(this.userNameKey, userName);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  clearUserName(): void {
    localStorage.removeItem(this.userNameKey);
  }
}
