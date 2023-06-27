import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() idAsignacion: number;
  link:string=null;

  constructor(private checkoutService:CheckoutService) { }

  ngOnInit(): void {
    this.checkoutService.obtenerLinkPagoPorId(this.idAsignacion).subscribe(obj=>{
      this.link=obj.link;
    })
  }

  redireccion(){
    if(this.link){
      window.location.replace(this.link);
    }
  }

}


