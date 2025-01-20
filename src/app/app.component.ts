import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'RXJS';

  minhaPromise(nome: string) : Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === 'Eduardo') {
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome);
        }, 5000);
      } else {
        reject('Ops! Você não é o Eduardo');
      }
    })
  }

  minhaObservable(nome: string) : Observable<string> {
    return new Observable(subscriber => {

      if (nome === 'Eduardo') {
        subscriber.next(`Olá! ${nome}`);
        subscriber.next(`Olá de novo! ${nome}`);
        setTimeout(() => {
          subscriber.next(`Olá com delay! ${nome}`);
        }, 5000);
        subscriber.complete();
      } else {
        subscriber.error('Ops! Deu erro!');
      }
    });
  }

  usuarioObservable(nome: string, email: string) : Observable<Usuario> {
    return new Observable(subscriber => {
      if (nome === 'Admin') {
        let usuario = new Usuario(nome, email);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);

      } else {
        subscriber.error('Ops! Deu erro!');
      }
    });
  }

  ngOnInit(): void {
    // this.minhaPromise('Eduardo')
    // .then(result => console.log(result));

    // this.minhaPromise('Mario')
    // .then(result => console.log(result))
    // .catch(error => console.log(error));

    // this.minhaObservable('Eduardos')
    //   .subscribe(
    //     resultado => console.log(resultado),
    //     erro => console.log(erro));

    const observer = {
      next: (valor: Usuario) => console.log('Next:', valor),
      error: (erro: Usuario) => console.log('Erro:', erro),
      complete: () => console.log('FIM!')
    };

    // const observable = this.minhaObservable('Eduardo');
    // observable.subscribe(observer);

    const observable = this.usuarioObservable('Admin', 'admin@admin.com');
    observable.subscribe(observer);
  }
}

export class Usuario {

  nome: string;
  email: string;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

}
