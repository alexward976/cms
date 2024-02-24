import { Injectable } from '@angular/core';
import { window } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindRefService {
  constructor() {}

  getNativeWindow() {
    return window;
  }
}
