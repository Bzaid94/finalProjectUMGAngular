import {Injectable} from "@angular/core";
import {OverlayContainer} from "@angular/cdk/overlay";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor(private overlay: OverlayContainer) {
    this.darkMode.next(localStorage.getItem('darkMode') === 'true');
    this.setDarkMode(this.darkMode.value);
  }

  toggleDarkMode(value: boolean) {
    this.darkMode.next(value);
    localStorage.setItem('darkMode', value ? 'true' : 'false');
    this.setDarkMode(value);
  }

  private setDarkMode(value: boolean) {
    const darkClassName = 'darkMode';
    if (value) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
  }
}
