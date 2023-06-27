import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './admin/admin-dashboard/dashboard/dashboard.component';
import { AsignacionesComponent } from './admin/asignaciones/asignaciones.component';
import { RecursoComponent } from './admin/recurso/recurso.component';
import { RegistrarHorariosComponent } from './admin/registrar-horarios/registrar-horarios.component';
import { RegistrarRecursoComponent } from './admin/recurso/registrar-recurso/registrar-recurso.component';
import { RegistrarTipoturnoComponent } from './admin/tipo-turno/registrar-tipoturno/registrar-tipoturno.component';
import { TipoTurnoComponent } from './admin/tipo-turno/tipo-turno.component';
import { LoginComponent } from './login/login.component';
import { RegistrarReservaComponent } from './registrar-reserva/registrar-reserva.component';
import { ReservasComponent } from './reservas/reservas.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserComponent } from './user/user/user.component';
import { ConfiguracionComponent } from './admin/configuracion/configuracion.component';
import { PaymentComponent } from './payment/payment.component';
import { FailureComponent } from './payment/failure/failure.component';
import { SuccessComponent } from './payment/success/success.component';
import { PendingComponent } from './payment/pending/pending.component';
//import { NgxMercadopagoComponent } from 'ngx-mercadopago';


const routes: Routes = [
  {path:'reservas',component:ReservasComponent},
  /*{path:'',redirectTo:'reservas',pathMatch:'full'},*/
  {path:'',component:UserComponent},
  //{path:'payment',component:PaymentComponent},

  {path:'payment-failure',component:FailureComponent},
  {path:'payment-success',component:SuccessComponent},
  {path:'payment-pending',component:PendingComponent},

  {path:'registrar-reserva',component:RegistrarReservaComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserDashboardComponent, pathMatch:'full', canActivate:[UserGuard]},
  {path:'admin',component:AdminDashboardComponent, /*pathMatch:'full',*/ canActivate:[AdminGuard],children:[
    {path:'',component:DashboardComponent, pathMatch:'full', canActivate:[AdminGuard]},
    {path:'registrar-recurso',component:RegistrarRecursoComponent, pathMatch:'full', canActivate:[AdminGuard]},
    {path:'editar-recurso',component:RecursoComponent, pathMatch:'full', canActivate:[AdminGuard]},
    {path:'registrar-tipo-turno',component:RegistrarTipoturnoComponent, pathMatch:'full', canActivate:[AdminGuard]},
    {path:'editar-tipo-turno',component:TipoTurnoComponent, pathMatch:'full', canActivate:[AdminGuard]},
    {path:'registrar-horarios',component:RegistrarHorariosComponent, pathMatch:'full', canActivate:[AdminGuard]},
    {path:'asignaciones',component:AsignacionesComponent, pathMatch:'full', canActivate:[AdminGuard]},
    {path:'configuracion',component:ConfiguracionComponent, pathMatch:'full', canActivate:[AdminGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
