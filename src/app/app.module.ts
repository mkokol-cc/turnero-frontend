import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservasComponent } from './reservas/reservas.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistrarReservaComponent } from './registrar-reserva/registrar-reserva.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './services/login.interceptor';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RegistrarRecursoComponent } from './admin/recurso/registrar-recurso/registrar-recurso.component';
import { RecursoComponent } from './admin/recurso/recurso.component';
import { RegistrarTipoturnoComponent } from './admin/tipo-turno/registrar-tipoturno/registrar-tipoturno.component';
import { RegistrarHorariosComponent } from './admin/registrar-horarios/registrar-horarios.component';
import { CalendarioComponent } from './admin/registrar-horarios/calendario/calendario.component';
import { AdminSidebarComponent } from './admin/admin-dashboard/admin-sidebar/admin-sidebar.component';
import { DashboardComponent } from './admin/admin-dashboard/dashboard/dashboard.component';
import { LoginSidebarComponent } from './admin/admin-dashboard/login-sidebar/login-sidebar.component';
import { ClientesComponent } from './admin/admin-dashboard/dashboard-elements/clientes/clientes.component';
import { NuevasReservasComponent } from './admin/admin-dashboard/dashboard-elements/nuevas-reservas/nuevas-reservas.component';
import { AgendaComponent } from './admin/admin-dashboard/dashboard-elements/agenda/agenda.component';
import { TipoTurnoComponent } from './admin/tipo-turno/tipo-turno.component';
import { ConfiguracionComponent } from './admin/configuracion/configuracion.component';
import { EstadisticasComponent } from './admin/estadisticas/estadisticas.component';
import { BuzonComponent } from './admin/buzon/buzon.component';
import { UserNavbarComponent } from './user/user-navbar/user-navbar.component';
import { UserComponent } from './user/user/user.component';
import { FormReservaComponent } from './user/form-reserva/form-reserva.component';
import { ComentariosComponent } from './user/comentarios/comentarios.component';
import { HorarioAsignacionComponent } from './admin/admin-dashboard/dashboard-elements/horario-asignacion/horario-asignacion.component';
import { AsignarTipoTurnoRecursoComponent } from './admin/admin-dashboard/dashboard-elements/asignar-tipo-turno-recurso/asignar-tipo-turno-recurso.component';
import { MostrarTipoTurnoRecursosComponent } from './admin/admin-dashboard/dashboard-elements/mostrar-tipo-turno-recursos/mostrar-tipo-turno-recursos.component';
import { SelectRecursosComponent } from './herramientas/select-recursos/select-recursos.component';
import { SelectTipoTurnoComponent } from './herramientas/select-tipo-turno/select-tipo-turno.component';
import { HorarioComunComponent } from './admin/admin-dashboard/dashboard-elements/horario-asignacion/horario-comun/horario-comun.component';
import { HorarioEspecialComponent } from './admin/admin-dashboard/dashboard-elements/horario-asignacion/horario-especial/horario-especial.component';
import { BotonesDashboardComponent } from './admin/admin-dashboard/botones-dashboard/botones-dashboard.component';
import { RegistrarFeriadoComponent } from './admin/admin-dashboard/dashboard-elements/registrar-feriado/registrar-feriado.component';
import { AsignacionesComponent } from './admin/asignaciones/asignaciones.component';
import { TablaAsignacionesComponent } from './admin/asignaciones/tabla-asignaciones/tabla-asignaciones.component';
import { DatosAsignacionComponent } from './admin/asignaciones/datos-asignacion/datos-asignacion.component';
import { HorariosAsignacionComponent } from './admin/asignaciones/datos-asignacion/horarios-asignacion/horarios-asignacion.component';
import { TablaRecursosComponent } from './admin/recurso/tabla-recursos/tabla-recursos.component';
import { HorariosRecursoComponent } from './admin/recurso/registrar-recurso/horarios-recurso/horarios-recurso.component';
import { TablaTipoturnoComponent } from './admin/tipo-turno/tabla-tipoturno/tabla-tipoturno.component';
import { DatosTipoturnoComponent } from './admin/tipo-turno/registrar-tipoturno/datos-tipoturno/datos-tipoturno.component';
import { BotonVerReservasComponent } from './admin/admin-dashboard/dashboard-elements/boton-ver-reservas/boton-ver-reservas.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
//import { NgxMercadopagoModule } from 'ngx-mercadopago';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './payment/success/success.component';
import { FailureComponent } from './payment/failure/failure.component';
import { PendingComponent } from './payment/pending/pending.component';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { NgxSpinnerModule  } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ReservasComponent,
    RegistrarReservaComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    RegistrarRecursoComponent,
    RecursoComponent,
    RegistrarTipoturnoComponent,
    RegistrarHorariosComponent,
    CalendarioComponent,
    AdminSidebarComponent,
    DashboardComponent,
    LoginSidebarComponent,
    ClientesComponent,
    NuevasReservasComponent,
    AgendaComponent,
    TipoTurnoComponent,
    ConfiguracionComponent,
    EstadisticasComponent,
    BuzonComponent,
    UserNavbarComponent,
    UserComponent,
    FormReservaComponent,
    ComentariosComponent,
    HorarioAsignacionComponent,
    AsignarTipoTurnoRecursoComponent,
    MostrarTipoTurnoRecursosComponent,
    SelectRecursosComponent,
    SelectTipoTurnoComponent,
    HorarioComunComponent,
    HorarioEspecialComponent,
    BotonesDashboardComponent,
    RegistrarFeriadoComponent,
    AsignacionesComponent,
    TablaAsignacionesComponent,
    DatosAsignacionComponent,
    HorariosAsignacionComponent,
    TablaRecursosComponent,
    HorariosRecursoComponent,
    TablaTipoturnoComponent,
    DatosTipoturnoComponent,
    BotonVerReservasComponent,
    PaymentComponent,
    SuccessComponent,
    FailureComponent,
    PendingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ConfirmDialogModule,
    CheckboxModule,
    CardModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
