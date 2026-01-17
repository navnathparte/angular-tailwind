import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
  icon?: string;
  createdAt: number;
  pausedAt?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);
  public toasts = this.toasts$.asObservable();

  private defaultDuration = 3000;
  private defaultPosition: ToastPosition = 'top-center';

  success(message: string, options?: Partial<Toast>) {
    return this.addToast({
      message,
      type: 'success',
      icon: '✓',
      ...options,
    });
  }

  error(message: string, options?: Partial<Toast>) {
    return this.addToast({
      message,
      type: 'error',
      icon: '✕',
      ...options,
    });
  }

  loading(message: string, options?: Partial<Toast>) {
    return this.addToast({
      message,
      type: 'loading',
      duration: 0, // Loading toasts don't auto-dismiss
      ...options,
    });
  }

  blank(message: string, options?: Partial<Toast>) {
    return this.addToast({
      message,
      type: 'blank',
      ...options,
    });
  }

  custom(message: string, options?: Partial<Toast>) {
    return this.addToast({
      message,
      type: 'custom',
      ...options,
    });
  }

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: Partial<Toast>,
  ) {
    const id = this.loading(messages.loading, options);

    promise
      .then((data) => {
        const successMessage =
          typeof messages.success === 'function' ? messages.success(data) : messages.success;
        this.dismiss(id);
        this.success(successMessage, options);
      })
      .catch((error) => {
        const errorMessage =
          typeof messages.error === 'function' ? messages.error(error) : messages.error;
        this.dismiss(id);
        this.error(errorMessage, options);
      });

    return id;
  }

  dismiss(id: string) {
    const currentToasts = this.toasts$.value;
    this.toasts$.next(currentToasts.filter((toast) => toast.id !== id));
  }

  remove(id: string) {
    this.dismiss(id);
  }

  private addToast(toast: Partial<Toast>): string {
    const id = toast.id || this.generateId();
    const newToast: Toast = {
      id,
      message: toast.message || '',
      type: toast.type || 'blank',
      duration: toast.duration ?? this.defaultDuration,
      position: toast.position || this.defaultPosition,
      icon: toast.icon,
      createdAt: Date.now(),
    };

    const currentToasts = this.toasts$.value;
    this.toasts$.next([...currentToasts, newToast]);

    // Auto dismiss if duration is set
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }

    return id;
  }

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
