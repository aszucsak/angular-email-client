import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent {
  email$: Observable<Email>;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.email$ = this.route.data.pipe(
      pluck('email')
    );
  }

}
