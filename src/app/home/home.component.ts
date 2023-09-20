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

        const http$ =  createHttpObservable('/api/courses');
        /*const courses$ = http$.pipe(
            catchError((err)=>{
                console.log('hubo un error',err)
                //return of([]);
                return throwError(err)
            }),
            finalize(()=>{
                console.log('se ejecuta cuando falla o cuando completa')
            }),
            tap(()=>console.log('http request executed')),
            map(res=> Object.values(res['payload'])),
            shareReplay(),
            catchError((err)=>{
                console.log('error de nuevo')// se puede aplicar todas las veces que necesitemos
                return throwError(err)
            }),
            finalize(()=>{
                console.log('finalize de nuevo')//se puede aplicar todas las veces que necesitemos
            })
            );*/
        const courses$ = http$.pipe(
            tap(()=>console.log('http request executed')),
            map(res=> Object.values(res['payload'])),
            shareReplay(),
            retryWhen(error=> error.pipe(()=>timer(2000)))
            );
        
        
        this.beginnerCourses$ = courses$.pipe(
            map((courses :any[])=> courses.filter(courses=> courses['category']==='BEGINNER'))
        );

        this.advancedCourses$ = courses$.pipe(
            map((courses :any[])=> courses.filter(courses=> courses['category']==='ADVANCED'))
        );
    }

}
