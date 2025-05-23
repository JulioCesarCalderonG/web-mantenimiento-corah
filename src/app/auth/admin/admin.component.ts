import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Login } from '../../interface/login.interface';
import { AuthAdminService } from '../../services/auth-admin.service';
import { ResultLogin } from '../../interface/result.login.interface';
import { Router } from '@angular/router';
import { closeAlert, loadData } from '../../alert/load';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule,
    ToastrModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  formLogin: FormGroup;
  carga: boolean = true;
  constructor(
    private fb: FormBuilder,
    private authServ: AuthAdminService,
    private route: Router,
    private toastServ:ToastrService
  ) {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.carga = false;
    if (!this.carga) {
      loadData(
        'Validando Datos',
        'Se esta validando el usuario y la contraseña, espere!!!'
      );
    }
    const data: Login = {
      usuario: this.formLogin.get('usuario')?.value,
      password: this.formLogin.get('password')?.value,
    };
    this.authServ.postLogin(data).subscribe({
      next: (data: ResultLogin) => {
        this.carga = true;
        setTimeout(() => {
          if (this.carga) {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('idUsuario', `${data.usuario.idUsuario}`);
            sessionStorage.setItem('usuario', `${data.usuario.nomUsuario}`);
            this.route.navigate(['/admin']);
          }
          closeAlert();
        }, 1000);
      },
      error: (error) => {
        this.carga=true;
        setTimeout(() => {
          if (this.carga) {
          closeAlert();
          this.toastServ.warning(`${error.error.msg}!!!`, 'Alerta');
        }
        }, 1000);
        
      },
    });
  }
}
