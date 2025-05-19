import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ReporteTrabajoDiarioService } from '../../../services/reporte-trabajo-diario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormReporteDiario } from '../../../interface/form.reporte.diario.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-r-trabajo-diario',
  standalone:true,
  imports: [MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './r-trabajo-diario.component.html',
  styleUrl: './r-trabajo-diario.component.css'
})
export class RTrabajoDiarioComponent implements OnInit{
  
  formReporte:FormGroup;
  constructor(private repoTrabDiario:ReporteTrabajoDiarioService, private fb:FormBuilder) {
    this.formReporte=this.fb.group({
      fechaInicio:['19/05/2025',Validators.required],
      fechaFin:['19/05/2025',Validators.required]
    })
  }
  ngOnInit(): void {
    this.getMostrarListado();
  }

  getMostrarListado(){
    const data: FormReporteDiario={
      fechaFin:this.formReporte.get('fechaInicio')?.value,
      fechaInicio:this.formReporte.get('fechaFin')?.value
    }
    this.repoTrabDiario.getListadoReporte(data).subscribe({
      next:(data)=>{
        console.log(data);
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }
  filtrar(){
    console.log('filtrado');
    
  }
}
