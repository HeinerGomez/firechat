import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( usuario => {
      console.log('Estado del usuario: ', usuario);
      if (!usuario) {
        return;
      }
      this.usuario.nombre = usuario.displayName;
      this.usuario.uid = usuario.uid;
    });
  }

  public login(proveedor: string): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public logout(): void {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }
  
  public cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                           .limit(5));
    return this.itemsCollection.valueChanges().pipe( map( (mensajes: Mensaje[]) => {
      this.chats = [];
      for (const mensaje of mensajes) {
        this.chats.unshift(mensaje);
      }
    }));
  }

  public agregarMensaje( texto: string ): Promise<any> {
    // TODO falta el uid
    const mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    };
    return this.itemsCollection.add(mensaje);
  }
}
