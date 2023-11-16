import {Component, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() idCard!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() iconName!: string;
  @Input() haveToggle: boolean = false;
  toggleActivated: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (this.haveToggle && localStorage.getItem('darkmode')) {
      this.toggleActivated = true;
    }
  }

  toggleDarkMode($event: any) {
    if ($event.target.checked) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      localStorage.setItem('darkmode', 'true');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
      localStorage.removeItem('darkmode');
    }
  }

}
