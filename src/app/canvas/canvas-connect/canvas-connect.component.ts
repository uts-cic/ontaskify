import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-canvas-connect',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './canvas-connect.component.html',
  styleUrls: ['./canvas-connect.component.scss'],
})
export class CanvasConnectComponent {
  token = inject(TokenService).token;
  tokenInput = signal<string>('');
  tokenIsValid = computed(() => {
    const token = this.tokenInput();
    if (!token?.length) return null;
    return !!token.match(/^[\d]{4}~[\w]{64}$/);
  });

  @ViewChild('input') inputEl!: ElementRef;

  async paste() {
    const textFromClipboard = await navigator.clipboard.readText();
    this.tokenInput.set(textFromClipboard);
    setTimeout(() => this.inputEl.nativeElement.select(), 0);
  }

  private router = inject(Router);
  startSession() {
    this.token.set(this.tokenInput());
    this.router.navigate([], { onSameUrlNavigation: 'reload' });
  }
}
