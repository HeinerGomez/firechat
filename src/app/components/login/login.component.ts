import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(public cs: ChatService) { }
  
  public ingresar(proveedor: string): void {
    this.cs.login(proveedor);
  }

}
