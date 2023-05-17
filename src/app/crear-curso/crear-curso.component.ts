import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {OverlayContainer} from "@angular/cdk/overlay";
import {Router} from "@angular/router";
import {ThemeService} from "../theme.service";
import {CursoService} from "../curso/curso.service";
import {CursoModel} from "../curso/curso.model";

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit{
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);
  flagToggle: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private submitted?: boolean;

  constructor(private cursoService: CursoService, private overlay: OverlayContainer, public router : Router, private themeService : ThemeService) {
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

  createCurso(){
    const data = {
      name : this.curso.name,
      description : this.curso.description
    };
    this.cursoService.newCurso(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.curso = {
        name : '',
        description : ''
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
