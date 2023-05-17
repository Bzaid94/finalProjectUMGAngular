import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {AlumnoService} from "../alumno/alumno.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import {Router} from "@angular/router";
import {ThemeService} from "../theme.service";
import {AlumnoModel} from "../alumno/alumno.model";

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit{
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);
  flagToggle: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private submitted?: boolean;

  constructor(private alumnoService: AlumnoService, private overlay: OverlayContainer, public router : Router, private themeService : ThemeService) {
    this.themeService.darkMode$.subscribe((darkMode) => {
      this.toggleControl.setValue(darkMode, {emitEvent: false});
      this.className = darkMode ? 'darkMode' : '';
      this.flagToggle = darkMode;
    });
  }

  alumno : AlumnoModel = {
    id : 0,
    name : "",
    lastName : "",
    carne : "",
    email : ""
  }

  createAlumno(){
    const data = {
      name : this.alumno.name,
      lastName : this.alumno.lastName,
      carne : this.alumno.carne,
      email : this.alumno.email
    };
    this.alumnoService.newAlumno(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.alumno = {
        name : '',
        lastName : '',
        carne : '',
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
