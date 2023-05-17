import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {OverlayContainer} from "@angular/cdk/overlay";
import {Router} from "@angular/router";
import {ThemeService} from "../theme.service";
import {CatedraticoService} from "../catedratico/catedratico.service";
import {CatedraticoModel} from "../catedratico/catedratico.model";

@Component({
  selector: 'app-crear-catedratico',
  templateUrl: './crear-catedratico.component.html',
  styleUrls: ['./crear-catedratico.component.css']
})
export class CrearCatedraticoComponent implements OnInit{
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);
  flagToggle: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private submitted?: boolean;

  constructor(private catedraticoService: CatedraticoService, private overlay: OverlayContainer, public router : Router, private themeService : ThemeService) {
    this.themeService.darkMode$.subscribe((darkMode) => {
      this.toggleControl.setValue(darkMode, {emitEvent: false});
      this.className = darkMode ? 'darkMode' : '';
      this.flagToggle = darkMode;
    });
  }

  catedratico : CatedraticoModel = {
    id : 0,
    name : "",
    lastName : "",
    speciality : "",
    email : ""
  }

  createCatedratico(){
    const data = {
      name : this.catedratico.name,
      lastName : this.catedratico.lastName,
      speciality : this.catedratico.speciality,
      email : this.catedratico.email
    };
    this.catedraticoService.newCatedratico(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.catedratico = {
        name : '',
        lastName : '',
        speciality : '',
        email : '',
      };
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.themeService.toggleDarkMode(darkMode ?? false);
    });
  }

  backToMenu() {
    this.router.navigate(['/']);
  }
}
