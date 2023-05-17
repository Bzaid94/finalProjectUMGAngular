import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})

export class PrincipalComponent implements OnInit{
  toggleControl = new FormControl(false);
  flagToggle: boolean = false;
  @HostBinding('class') className = '';

  constructor(private themeService : ThemeService) {
    this.themeService.darkMode$.subscribe((darkMode) => {
      this.toggleControl.setValue(darkMode, {emitEvent: false});
      this.className = darkMode ? 'darkMode' : '';
      this.flagToggle = darkMode;
    });
  }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.themeService.toggleDarkMode(darkMode ?? false);
    });
  }
}
