import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  progress = signal<Progess | null>(null);
}
