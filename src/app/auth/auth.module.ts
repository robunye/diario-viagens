import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { UsuarioNaoVerificadoComponent } from './components/usuario-nao-verificado/usuario-nao-verificado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
    UsuarioNaoVerificadoComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgxCaptchaModule
  ],
})
export class AuthModule {}

/**
 * Agrupar as funcionalidades de autenticação:
 * - Página de login
 * - Página de cadastro
 * - Página de redefinir senha
 */
