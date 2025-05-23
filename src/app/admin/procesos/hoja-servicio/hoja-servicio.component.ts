import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { HojaServicioService } from '../../../services/hoja-servicio.service';
import { FormHojaSer } from '../../../interface/form.hoja.servicio.interface';
import { loadData, closeAlert } from './../../../alert/load';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HojaServicio, ResultHojaServicio } from '../../../interface/result.hoja.servicio.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-hoja-servicio',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule
  ],
  templateUrl: './hoja-servicio.component.html',
  styleUrl: './hoja-servicio.component.css',
})
export class HojaServicioComponent implements OnInit {
  //carga
  carga:boolean=true;
  //año
  currentYear = new Date().getFullYear();
  mes: number = new Date().getMonth() + 1;
  years: number[] = [];
  estate: number = -1;
  //mes
  meses = [
    { nombre: 'enero', valor: 1 },
    { nombre: 'febrero', valor: 2 },
    { nombre: 'marzo', valor: 3 },
    { nombre: 'abril', valor: 4 },
    { nombre: 'mayo', valor: 5 },
    { nombre: 'junio', valor: 6 },
    { nombre: 'julio', valor: 7 },
    { nombre: 'agosto', valor: 8 },
    { nombre: 'septiembre', valor: 9 },
    { nombre: 'octubre', valor: 10 },
    { nombre: 'noviembre', valor: 11 },
    { nombre: 'diciembre', valor: 12 },
  ];

  //estado
  //mes
  estado = [
    { nombre: 'TODOS', valor: -1 },
    { nombre: 'PENDIENTE', valor: 0 },
    { nombre: 'EJECUTADO', valor: 1 },
    { nombre: 'TERMINADO', valor: 2 },
  ];

  //Formgroup
  formHoja: FormGroup;
  //Tabla
  displayedColumns: string[] = [
    'numero',
    'fechaemision',
    'solicitante',
    'tipo',
    'motivo',
    'codigo',
    'placa',
    'direccion',
    'estado',
    'fechaultima',
    'acciones'
  ];
  dataSource = new MatTableDataSource<HojaServicio>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //generando reporte
  pdfUrl?: string;
  constructor(private hojaServ: HojaServicioService, private fb: FormBuilder, private modalService: NgbModal) {
    for (let i = 0; i <= this.currentYear - 2005; i++) {
      this.years.push(this.currentYear - i);
    }
    this.formHoja = this.fb.group({
      anio: [this.currentYear, Validators.required],
      mes: [this.mes, Validators.required],
      estado: [this.estate, Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarHojaServicio();
    //this.generarReporte()
  }
  listarHojaServicio() {
    this.carga=false;
    if (!this.carga) {
      loadData('Cargando Informacion','Se esta cargando la informacion, espere por favor!!!');
    }
    const data: FormHojaSer = {
      anio: this.formHoja.get('anio')?.value,
      mes: this.formHoja.get('mes')?.value,
      estado: this.formHoja.get('estado')?.value,
    };
    this.hojaServ.getHojaServicio(data).subscribe({
      next: (data:ResultHojaServicio) => {
        this.dataSource.data=data.hojaServicio;
        this.dataSource.paginator=this.paginator;
        this.carga=true;
        setTimeout(() => {
          
          this.carga=false;
          closeAlert();
        }, 1000);
      },
      error: (error) => {
        this.carga=true;
        setTimeout(() => {
          this.carga=false;
          console.log(error);
          closeAlert();
        }, 1000);
      },
    });
  }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  generarReporte(id:number,content: any) {
    this.carga=false;
    if (!this.carga) {
      loadData('Generando Reporte','Se esta generando el reporte, espere por favor!!!');
    }
    this.hojaServ.generarReporte(id).subscribe({
      next:(blob)=>{
        this.carga = true;
          setTimeout(() => {
            const url = URL.createObjectURL(blob);
            this.pdfUrl = url;
            this.modalService.open(content, { size: 'xl' });
            closeAlert();
          }, 1000);
      },error:(err)=>{
        console.error('Error al obtener el PDF:', err);
          this.carga = true;
          setTimeout(() => {
            if (this.carga) {
              closeAlert();
            }
          }, 1000);
      }
    })
  }
  buscar(){
    console.log('click');
  }
  convertirString(fecha:any):string{
    const fech = String(fecha).split('T');
    return fech[0];
  }
  cambiarEstado(numero:number):string{
    let estado:string="";
    switch (numero) {
      case 0:
        estado="PENDIENTE"
        break;
      case 1:
        estado="EJECUTADO"
        break;
      case 2:
        estado="TERMINADO"
        break;
      default:
        break;
    }
    return estado;
  }
}
