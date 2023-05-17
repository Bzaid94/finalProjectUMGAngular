import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";
import {Router} from "@angular/router";
import {ThemeService} from "../theme.service";
import {CatedraticoService} from "./catedratico.service";
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {CatedraticoModel} from "./catedratico.model";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-catedratico',
  templateUrl: './catedratico.component.html',
  styleUrls: ['./catedratico.component.css']
})

export class CatedraticoComponent implements AfterViewInit, OnInit{
  @HostBinding('class') className = '';
  dataSource: any;
  toggleControl = new FormControl(false);
  flagToggle: boolean = false;
  displayedColumns: String[] = ['id', 'name', 'lastName', 'speciality', 'email', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  catedraticos ?: CatedraticoModel[];
  submitted = false;
  ngAfterViewInit() {
    this.getAllCatedratico();
  }

  getAllCatedratico(){
    this.catedraticoService.getAllCatedraticos().subscribe((catedraticos) => {
      this.dataSource = new MatTableDataSource<CatedraticoModel>(catedraticos);
      this.dataSource.paginator = this.paginator;
      this.catedraticos = catedraticos;
      console.log(catedraticos);
    }, error => {
      console.log(error);
    });
  }

  updateCatedratico(id: number){
    const data = {
      name : this.catedratico.name,
      lastName : this.catedratico.lastName,
      speciality : this.catedratico.speciality,
      email : this.catedratico.email
    };
    this.catedraticoService.updateCatedratico(id, data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.catedratico = {
        name : '',
        lastName : '',
        speciality : '',
        email : '',
      };
      this.getAllCatedratico();
    }, error => {
      console.log(error);
    });
  }

  deleteCatedratico(id: number){
    this.catedraticoService.deleteCatedratico(id).subscribe(response => {
      console.log(response);
      this.getAllCatedratico();
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
