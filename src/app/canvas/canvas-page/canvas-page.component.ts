import { CommonModule } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { CanvasConnectComponent } from '../canvas-connect/canvas-connect.component';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-canvas-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, CanvasConnectComponent],
  templateUrl: './canvas-page.component.html',
  styleUrls: ['./canvas-page.component.scss'],
})
export class CanvasPageComponent {
  @Input({ required: true }) profile!: UserProfile;
  private token = inject(TokenService).token;
  maskedToken = computed(() => this.token()?.substring(0, 6).padEnd(9, '*'));

  private router = inject(Router);
  endSession() {
    this.token.set(null);
    this.router.navigate([], { onSameUrlNavigation: 'reload' });
  }
}
