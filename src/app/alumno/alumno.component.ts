import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {OverlayContainer} from "@angular/cdk/overlay";
import {AlumnoService} from "./alumno.service";
import {AlumnoModel} from "./alumno.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements AfterViewInit, OnInit{
  @HostBinding('class') className = '';
  dataSource: any;
  toggleControl = new FormControl(false);
  flagToggle: boolean = false;
  displayedColumns: String[] = ['id', 'name', 'lastName', 'carne', 'email', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.getAllAlumnos();
  }

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

  alumnos ?: AlumnoModel[];
  submitted = false;

  getAllAlumnos(){
    this.alumnoService.getAllAlumnos().subscribe((alumnos) => {
      this.dataSource = new MatTableDataSource<AlumnoModel>(alumnos);
      this.dataSource.paginator = this.paginator;
      this.alumnos = alumnos;
      console.log(alumnos);
    }, error => {
      console.log(error);
      });
  }

  updateAlumno(id: number){
    const data = {
      name : this.alumno.name,
      lastName : this.alumno.lastName,
      carne : this.alumno.carne,
      email : this.alumno.email
    };
    this.alumnoService.updateAlumno(id, data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.alumno = {
        name : '',
        lastName : '',
        carne : '',
        email : '',
      };
      this.getAllAlumnos();
    }, error => {
      console.log(error);
    });
  }

  deleteAlumno(id: number){
    this.alumnoService.deleteAlumno(id).subscribe(response => {
      console.log(response);
      this.getAllAlumnos();
    }, error => {
      console.log(error)
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
