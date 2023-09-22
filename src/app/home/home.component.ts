import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';

/**
 * retryWhen para reintentar
 * finalize se puede llamar varias veces se llama cuando hay error o cuando se completa el observable anterior
 * catchError nos sirve para manejar el error
 * 
 * throttle es parecido al bedounce pero emite pirmero lo que hay , entrega regsultados mas rapido pero no te da lo ultimo
 */

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(private store:Store) {

    }

    ngOnInit() {
        this.beginnerCourses$ = this.store.selectBeginnerCourses();

        this.advancedCourses$ = this.store.selectAdvancedCourses();
    }

}
