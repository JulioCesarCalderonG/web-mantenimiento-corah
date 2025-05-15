import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Login } from '../../interface/login.interface';
import { AuthAdminService } from '../../services/auth-admin.service';
import { ResultLogin } from '../../interface/result.login.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  formLogin:FormGroup;
  constructor(private fb:FormBuilder, private authServ:AuthAdminService, private route:Router){
    this.formLogin = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(){
    const data:Login={
      usuario:this.formLogin.get('usuario')?.value,
      password:this.formLogin.get('password')?.value
    }
    this.authServ.postLogin(data).subscribe({
      next:(data:ResultLogin)=>{
        console.log(data);
        sessionStorage.setItem('token',data.token);
        sessionStorage.setItem('idUsuario',`${data.usuario.idUsuario}`);
        sessionStorage.setItem('usuario',`${data.usuario.nomUsuario}`);
        this.route.navigate(["/admin"]);
      },
      error:error=>{
        console.log(error);
        
      }
    });    
  }
}
