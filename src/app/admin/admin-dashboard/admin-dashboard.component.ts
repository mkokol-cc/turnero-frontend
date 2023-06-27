import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  opcion:number;
  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const sidebar = document.querySelector('.sidebar');
    if (this.sidebarVisible) {
      sidebar.classList.add('show');
    } else {
      sidebar.classList.remove('show');
    }
  }

  constructor(private service:LoginService) { }

  ngOnInit(): void {
    console.log(this.service.getToken());
  }

  recibirDato(a:number){
    this.opcion=a;
  }

}
