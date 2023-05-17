import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {OverlayContainer} from "@angular/cdk/overlay";
import {AlumnoService} from "./alumno.service";
import {AlumnoModel} from "./alumno.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ThemeService} from "../theme.service";
import {ConfirmDeleteDialogComponent} from "../confirm-delete-dialog/confirm-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateAlumnoDialogComponent} from "../update-alumno-dialog/update-alumno-dialog.component";

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

  constructor(private alumnoService: AlumnoService, private overlay: OverlayContainer, public router : Router, private themeService : ThemeService, public dialog : MatDialog) {
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

  updateAlumno(id: number, name: string, lastName: string, carne: string, email : string) {
    const dialogRef = this.dialog.open(UpdateAlumnoDialogComponent, {
      width: '300px',
      data: {name: name, lastName: lastName, carne: carne, email: email}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumnoService.updateAlumno(id, result).subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.getAllAlumnos();
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  deleteAlumno(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumnoService.deleteAlumno(id).subscribe(
          response => {
            console.log(response);
            this.alumnoService.getAllAlumnos();
          },
          error => {
            console.log(error);
          }
        );
      }
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
