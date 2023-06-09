import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {OverlayContainer} from "@angular/cdk/overlay";
import {Router} from "@angular/router";
import {ThemeService} from "../theme.service";
import {MatTableDataSource} from "@angular/material/table";
import {CursoService} from "./curso.service";
import {CursoModel} from "./curso.model";
import {UpdateCursoDialogComponent} from "../update-curso-dialog/update-curso-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteDialogComponent} from "../confirm-delete-dialog/confirm-delete-dialog.component";

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements AfterViewInit, OnInit {
  @HostBinding('class') className = '';
  dataSource: any;
  toggleControl = new FormControl(false);
  flagToggle: boolean = false;
  displayedColumns: String[] = ['id', 'name', 'description', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.getAllCursos();
  }

  constructor(private cursoService: CursoService, private overlay: OverlayContainer, public router : Router, private themeService : ThemeService, public dialog : MatDialog) {
    this.dataSource = new MatTableDataSource<CursoModel>();
    this.themeService.darkMode$.subscribe((darkMode) => {
      this.toggleControl.setValue(darkMode, {emitEvent: false});
      this.className = darkMode ? 'darkMode' : '';
      this.flagToggle = darkMode;
    });
  }

  curso : CursoModel = {
    id : 0,
    name : "",
    description : ""
  }

  cursos ?: CursoModel[];
  submitted = false;

  getAllCursos(){
    this.cursoService.getAllCursos().subscribe((cursos) => {
      this.dataSource.data = cursos;
      this.dataSource.paginator = this.paginator;
      this.cursos = cursos;
      console.log(cursos);
    }, error => {
      console.log(error);
    });
  }

  updateCurso(id: number, name: string, description: string) {
    const dialogRef = this.dialog.open(UpdateCursoDialogComponent, {
      width: '300px',
      data: {name: name, description: description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cursoService.updateCurso(id, result).subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.getAllCursos();
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  deleteCurso(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cursoService.deleteCurso(id).subscribe(
          response => {
            console.log(response);
            this.cursoService.getAllCursos();
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
