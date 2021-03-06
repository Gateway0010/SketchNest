import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client/dist/socket.io';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as EventEmitter from 'events';
@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  socket;
  canvas:Observable<any>;
  private url: 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  public setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
  public sendCanvas(canvas) {
    this.socket.emit('update-canvas', canvas);
    this.canvas=canvas
  }
  public updateCanvas() {
     return this.canvas = new Observable((observer) => {
       this.socket.on('canvas', (canvas) => {
        console.log("JSON:"+canvas);
        observer.add(canvas);
      });
    });
  }
}
