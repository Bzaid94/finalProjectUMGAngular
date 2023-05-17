import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { HttpClientModule } from "@angular/common/http";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { CursoComponent } from './curso/curso.component';
import { CatedraticoComponent } from './catedratico/catedratico.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { PrincipalComponent } from './principal/principal.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { CrearCatedraticoComponent } from './crear-catedratico/crear-catedratico.component';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';

const routes: Routes = [
  { path: 'alumno', component: AlumnoComponent },
  { path: 'catedratico', component: CatedraticoComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'principal', component: PrincipalComponent},
  { path: 'crear_alumno', component: CrearAlumnoComponent},
  { path: 'crear_catedratico', component: CrearCatedraticoComponent},
  { path: 'crear_curso', component: CrearCursoComponent},
  { path: '**', redirectTo: 'principal', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    CursoComponent,
    CatedraticoComponent,
    AlumnoComponent,
    PrincipalComponent,
    CrearAlumnoComponent,
    CrearCatedraticoComponent,
    CrearCursoComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        FormsModule,
        MatCardModule,
        MatMenuModule
    ],
  exports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
