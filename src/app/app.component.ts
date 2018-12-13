import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularfire-todo';
  items: Observable<{}>;
  constructor(private database: AngularFirestore, private db: AngularFireDatabase) {
    // this.items = this.database.collection('test').valueChanges();
    // this.items.subscribe(console.log);

    this.db.object('test').valueChanges().subscribe(console.log);
  }
}
