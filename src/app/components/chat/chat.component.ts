import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  public mensaje = '';
  private elemento: any;

  constructor(private chatService: ChatService) { 
    this.chatService.cargarMensajes().subscribe( () => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  public enviar_mensaje(): void {
    if (this.mensaje.length !== 0) {
      this.chatService.agregarMensaje(this.mensaje).then( () => {
        console.log('Mensaje Enviado');
        this.mensaje = '';
      }).catch( err => {
        this.mensaje = '';
        console.error('Error al enviar', err);
      });
    }
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

}
