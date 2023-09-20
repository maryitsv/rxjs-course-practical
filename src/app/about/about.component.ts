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
        // asi cancelamos el observable
       //const interval$ = interval(1000);

       //const sub = interval$.subscribe(console.log);

       //setTimeout(()=>sub.unsubscribe,5000);


       const http$ =  createHttpObservable('/api/courses');

       const sub = http$.subscribe();

       setTimeout(()=>sub.unsubscribe(),0);

    }

    /**session 2 
     * const source1$ = of(1,2,3);
       const source2$ = of(4,5,6);
       const source3$ = of(7,8,9);

       const result$ = concat (source1$, source2$, source3$);
       result$.subscribe(val=> console.log(val));


        const interval1$ = interval(1000);
        const interval2$ = interval1$.pipe(map(val => val * 10));

        const result = merge(interval1$, interval2$);

        result.subscribe(console.log);
     */

    /**
     * session 1
        const http$ = Observable.create(observer => {
            //observer.next() , complete error
            fetch('/api/courses')
                .then(res => {
                    res.json();
                })
                .then(res => {
                    observer.next(res);
                    observer.complete();
                    console.log('aqui')
                    // si hacemos otra vez next falla
                    observer.next({'as':'like'});
                })
                .catch(err=>{
                    observer.err(err);
                })
                ; // promesa
        });

        http$.subscribe(
            result=>{
                console.log('encontro los cursos del api', result);
            },
            noop,
            ()=>console.log('completed'));
        
        //const interval$ = interval(1000);
        const interval$ = timer(3000, 1000);
        const sub = interval$.subscribe((val)=>{
            console.log('interval', val);
        });

        setTimeout(()=>
            sub.unsubscribe()
        ,5000)

        const clicks$ = fromEvent(this.document,'click');
        clicks$.subscribe(
            event=>{ console.log(event)},
            err=>{ console.log(err)},
            ()=> console.log('completed')
        );
        
        // streams
        
        this.document.addEventListener('click',evt=>{
            console.log(evt);
        });

        let counter = 0;

        setInterval(()=>{
            console.log(counter);
            counter++;
        },1000);

        setTimeout(()=>{
            console.log('timeout here')
        },3000);

     */
}






