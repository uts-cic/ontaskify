import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-canvas-connect',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './canvas-connect.component.html',
  styleUrls: ['./canvas-connect.component.scss'],
})
export class CanvasConnectComponent {
  private tokenSignal = inject(TokenService).token;

  private _token = this.tokenSignal() || '';
  get token() {
    return this._token;
  }
  set token(token: string) {
    this._token = token?.trim() || '';
    this.isValid = !!this._token?.match(/^[\d]{4}~[\w]{64}$/);
  }
  isValid = false;

  @ViewChild('input') inputEl!: ElementRef;

  async paste() {
    this.token = await navigator.clipboard.readText();
    setTimeout(() => this.inputEl.nativeElement.select(), 0);
  }

  startSession() {
    this.isValid && this.tokenSignal.set(this.token);
  }
}
