import { Component } from '@angular/core';
import { LoaderService, LoaderType } from '../../core/services/loader.service';
import { ToastService } from '../../core/services/toast.service';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb';
import { Router } from '@angular/router';

interface Card {
  title: string;
  icon: string;
  description: string;
  delay: string;
  loader: LoaderType;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Breadcrumb],
  templateUrl: './landing.html',
})
export class Landing {
  constructor(
    private loaderService: LoaderService,
    private toast: ToastService,
    private router: Router,
  ) {}

  header = {
    label: 'EXCELLENCE HUB',
    titleStart: 'Reward',
    titleMiddle: '&',
    titleEnd: 'Recognition',
    subtitle:
      'Celebrating excellence at every milestone. Choose your recognition period and honor outstanding achievements.',
  };

  footerText = 'Select a period to explore recognition options';

  cards: Card[] = [
    {
      title: 'MONTHLY',
      icon: '⭐',
      description:
        'Recognize outstanding performers each month with special badges and certificates of achievement.',
      delay: '0.2s',
      loader: 'orbe',
    },
    {
      title: 'QUARTERLY',
      icon: '🏆',
      description:
        'Celebrate consistent excellence with quarterly awards and exclusive team recognition events.',
      delay: '0.4s',
      loader: 'card',
    },
    {
      title: 'HALF YEAR',
      icon: '🥇',
      description:
        'Honor sustained commitment with semi-annual rewards including bonuses and career development opportunities.',
      delay: '0.6s',
      loader: 'fullscreen',
    },
    {
      title: 'YEARLY',
      icon: '💎',
      description:
        'The pinnacle of recognition - annual champions receive premium rewards and company-wide celebration.',
      delay: '0.8s',
      loader: 'loading-logo',
    },
  ];

  showLoader(type: LoaderType) {
    console.log('type', type);
    this.loaderService.show(type);

    setTimeout(() => {
      this.loaderService.hide();
      this.toast.success('Successfully load!', { position: 'top-center' });
    }, 2000);
  }

  showSuccess() {
    this.toast.success('Data saved successfully!');
  }

  showError() {
    this.toast.error('Something went wrong!');
  }

  showLoading() {
    const id = this.toast.loading('Saving data...');

    setTimeout(() => {
      this.toast.dismiss(id);
      this.toast.success('Done!');
    }, 2000);
  }

  navigate(card: Card) {
    this.loaderService.show(card.loader);

    setTimeout(() => {
      this.loaderService.hide();
      this.router.navigate(['/winner', card.title.toLowerCase()]);
    }, 1200);
  }
}
