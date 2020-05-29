import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emails$: Observable<any>;

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.emails$ = this.emailService.getEmails();
  }

}
