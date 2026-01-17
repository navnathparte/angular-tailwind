import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Toast, ToastPosition, ToastService } from '../../core/services/toast.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-toaster',
  imports: [CommonModule, NgClass],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster implements OnInit {
  toasts: Toast[] = [];
  positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  constructor(
    public toastService: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.toastService.toasts.subscribe((toasts) => {
      this.toasts = toasts;
      this.cdr.detectChanges();
    });
  }

  getToastsByPosition(position: ToastPosition): Toast[] {
    return this.toasts.filter((toast) => (toast.position || 'top-center') === position);
  }

  getPositionClass(position: ToastPosition): string {
    const classes: Record<ToastPosition, string> = {
      'top-left': 'top-0 left-0 items-start',
      'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
      'top-right': 'top-0 right-0 items-end',
      'bottom-left': 'bottom-0 left-0 items-start',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
      'bottom-right': 'bottom-0 right-0 items-end',
    };
    return classes[position];
  }

  getToastClass(type: string): string {
    const classes: Record<string, string> = {
      success: 'bg-white border-green-500',
      error: 'bg-white border-red-500',
      loading: 'bg-white border-blue-500',
      blank: 'bg-white border-gray-300',
      custom: 'bg-white border-purple-500',
    };
    return classes[type] || classes['blank'];
  }

  getIconClass(type: string): string {
    const classes: Record<string, string> = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      loading: 'bg-blue-500 text-white',
      blank: 'bg-gray-500 text-white',
      custom: 'bg-purple-500 text-white',
    };
    return classes[type] || classes['blank'];
  }

  dismiss(id: string) {
    this.toastService.dismiss(id);
  }
}
