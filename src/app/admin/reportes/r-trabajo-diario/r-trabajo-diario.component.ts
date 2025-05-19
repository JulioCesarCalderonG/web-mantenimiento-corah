import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReporteTrabajoDiarioService } from '../../../services/reporte-trabajo-diario.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormReporteDiario } from '../../../interface/form.reporte.diario.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ResultTrabajoDiario,
  TablaDiario,
} from '../../../interface/result.trabajo.diario.interface';

@Component({
  selector: 'app-r-trabajo-diario',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './r-trabajo-diario.component.html',
  styleUrl: './r-trabajo-diario.component.css',
})
export class RTrabajoDiarioComponent implements OnInit, AfterViewInit {
  model?: NgbDateStruct;
  formReporte: FormGroup;
  listTrabajoDiario: TablaDiario[] = [];
  //TABLA
  displayedColumns: string[] = [
    'sede',
    'numero',
    'especialidad',
    'fecha',
    'tipo',
    'descripcion',
    'codigo',
    'bien',
    'placa',
    'ano',
    'ubicacion',
    'direccion',
  ];
  dataSource = new MatTableDataSource<TablaDiario>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private repoTrabDiario: ReporteTrabajoDiarioService,
    private fb: FormBuilder
  ) {
    this.formReporte = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    //this.getMostrarListado();
    //this.dataSource.paginator = this.paginator!;
  }
  ngAfterViewInit(): void {}

  getMostrarListado() {
    if (
      this.formReporte.get('fechaInicio')?.value == '' ||
      this.formReporte.get('fechaFin')?.value == ''
    ) {
      alert('Los campos son obligatorios');
    }
    if (
      this.formReporte.get('fechaInicio')?.value >
      this.formReporte.get('fechaFin')?.value
    ) {
      alert('La fecha fin no puede ser menor a la de inicio');
    } else {
      const data: FormReporteDiario = {
        fechaInicio: `${this.formReporte.get('fechaInicio')?.value.day}/${
          this.formReporte.get('fechaInicio')?.value.month
        }/${this.formReporte.get('fechaInicio')?.value.year}`,
        fechaFin: `${this.formReporte.get('fechaFin')?.value.day}/${
          this.formReporte.get('fechaFin')?.value.month
        }/${this.formReporte.get('fechaFin')?.value.year}`,
      };
      this.repoTrabDiario.getListadoReporte(data).subscribe({
        next: (data: ResultTrabajoDiario) => {
          this.listTrabajoDiario = data.tablaDiario;
          console.log(this.listTrabajoDiario);
          this.dataSource.data = data.tablaDiario;
          this.dataSource.paginator = this.paginator;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
