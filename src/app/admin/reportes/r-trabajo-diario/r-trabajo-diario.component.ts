import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ResultTrabajoDiario,
  TablaDiario,
} from '../../../interface/result.trabajo.diario.interface';
import { HttpClient } from '@angular/common/http';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CommonModule } from '@angular/common';
import { formatDate, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { closeAlert, loadData } from '../../../alert/load';
registerLocaleData(localeEs);

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-r-trabajo-diario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
  ],
  templateUrl: './r-trabajo-diario.component.html',
  styleUrl: './r-trabajo-diario.component.css',
})
export class RTrabajoDiarioComponent implements OnInit, AfterViewInit {
  carga: boolean = true;
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
  //Generar Reporte
  pdfUrl?: string;
  //FECHA ACTUAL
  fecha = formatDate(new Date(), 'dd/MM/yyyy', 'es');
  private http = inject(HttpClient);
  constructor(
    private repoTrabDiario: ReporteTrabajoDiarioService,
    private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this.formReporte = this.fb.group({
      fechaInicio: [new Date(), Validators.required],
      fechaFin: [new Date(), Validators.required],
    });
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.getMostrarListado();
    //this.dataSource.paginator = this.paginator!;
  }
  ngAfterViewInit(): void { }

  getMostrarListado() {
    if (
      this.formReporte.get('fechaInicio')?.value >
      this.formReporte.get('fechaFin')?.value
    ) {
      alert('La fecha fin no puede ser menor a la de inicio');
    } else {
      this.carga = false;
      if (!this.carga) {
        loadData('Cargando Informacion', 'Se esta cargando la informacion de los trabajos diarios');
      }
      const data: FormReporteDiario = {
        fechaInicio: `${formatDate(
          this.formReporte.get('fechaInicio')?.value,
          'dd/MM/yyyy',
          'es'
        )}`,
        fechaFin: `${formatDate(
          this.formReporte.get('fechaFin')?.value,
          'dd/MM/yyyy',
          'es'
        )}`,
      };
      this.repoTrabDiario.getListadoReporte(data).subscribe({
        next: (data: ResultTrabajoDiario) => {
          this.listTrabajoDiario = data.tablaDiario;
          this.dataSource.data = data.tablaDiario;
          this.dataSource.paginator = this.paginator;
          this.carga = true;
          setTimeout(() => {
            if (this.carga) {
              closeAlert();
            }
          }, 1000);
        },
        error: (error) => {
          console.log(error);
          this.carga = true;
          setTimeout(() => {
            if (this.carga) {
              closeAlert();
            }
          }, 1000);
        },
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  generarReporte(content: any) {
    if (
      this.formReporte.get('fechaInicio')?.value >
      this.formReporte.get('fechaFin')?.value
    ) {
      alert('La fecha fin no puede ser menor a la de inicio');
    } else {
      this.carga = false;
      if (!this.carga) {
        loadData('Generando Reporte', 'Se esta generando el reporte, espere por favor!!!');
      }
      const data: FormReporteDiario = {
        fechaInicio: `${formatDate(
          this.formReporte.get('fechaInicio')?.value,
          'dd/MM/yyyy',
          'es'
        )}`,
        fechaFin: `${formatDate(
          this.formReporte.get('fechaFin')?.value,
          'dd/MM/yyyy',
          'es'
        )}`,
      };

      this.repoTrabDiario.generarReporte(data).subscribe({
        next: (blob) => {
          this.carga = true;
          setTimeout(() => {
            const url = URL.createObjectURL(blob);
            this.pdfUrl = url;
            this.modalService.open(content, { size: 'xl' });
            closeAlert();
          }, 1000);
        },
        error: (err) => {
          console.error('Error al obtener el PDF:', err);
          this.carga = true;
          setTimeout(() => {
            if (this.carga) {
              closeAlert();
            }
          }, 1000);
        },
      });

    }

  }
}
