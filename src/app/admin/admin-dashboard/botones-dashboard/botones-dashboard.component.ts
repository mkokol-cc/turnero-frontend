import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-botones-dashboard',
  templateUrl: './botones-dashboard.component.html',
  styleUrls: ['./botones-dashboard.component.css']
})
export class BotonesDashboardComponent implements OnInit {

  @Input() opcion:number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
