import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService, LoaderType } from '../../core/services/loader.service';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb';

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
  templateUrl: './landing.html',
})
export class Landing implements AfterViewInit, OnDestroy {
  constructor(
    private loaderService: LoaderService,
    private router: Router,
  ) {}

  @ViewChild('cardScroller') scroller!: ElementRef;

  scrollInterval!: any;

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

  ngAfterViewInit() {
    this.scroller.nativeElement.addEventListener('scroll', () => this.updateActiveCard());
    this.startAutoScroll();
    this.updateActiveCard();
  }

  startAutoScroll() {
    const container = this.scroller.nativeElement;

    this.scrollInterval = setInterval(() => {
      const step = 350;
      container.scrollBy({ left: step, behavior: 'smooth' });

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        }, 600);
      }
    }, 3000);
  }

  updateActiveCard() {
    const container = this.scroller.nativeElement;
    const cards = container.querySelectorAll('.card-item');

    const center = container.scrollLeft + container.clientWidth / 2;

    cards.forEach((card: any) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      card.classList.toggle('active-card', Math.abs(center - cardCenter) < card.clientWidth / 2);
    });
  }

  navigate(card: Card) {
    this.loaderService.show(card.loader);

    setTimeout(() => {
      this.loaderService.hide();
      this.router.navigate(['/winner', card.title.toLowerCase()]);
    }, 1200);
  }

  ngOnDestroy() {
    clearInterval(this.scrollInterval);
  }
}
