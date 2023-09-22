import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject,
    pipe
} from 'rxjs';
import { concatMap, delayWhen, filter, map, take, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { DOCUMENT } from '@angular/common';
import { SubjectSubscriber } from 'rxjs/internal/Subject';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    //const DOCUMENT: InjectionToken<Document>;
    constructor(@Inject(DOCUMENT) public document) {

    }

    ngOnInit() {
       
        // generalmente es una buena practica que el subject sea privado 
        // y que solo esta clase lo manipule next
        // el resto de clases de deberian comunicar o suscribirse a la version publica asObservable
        // const subject = new Subject();
        /*const subject = new BehaviorSubject(0);
        // subject.subscribe();

        const series$ = subject.asObservable();// este podria ser el obs publico
        series$.subscribe(val =>console.log('early ',val))
        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.complete();
        setTimeout(()=>{
            series$.subscribe(val =>console.log('late ',val));
         //   subject.next(4);
        },2000)*/

        const subject = new Subject();
        
        const series$ = subject.asObservable();// este podria ser el obs publico
        series$.subscribe(val =>console.log('first sub ',val))
        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.complete();
        setTimeout(()=>{
            series$.subscribe(val =>console.log('second ',val));
         //   subject.next(4);
        },2000)


    }

}






