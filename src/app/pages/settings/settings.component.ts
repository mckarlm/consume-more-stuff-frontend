import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent {

  constructor(
    private router: Router
  ) { }
}