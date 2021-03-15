import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  lightMode = 'Light';
  darkMode = 'Dark';

  constructor() { }

  ngOnInit(): void {
  }

}
