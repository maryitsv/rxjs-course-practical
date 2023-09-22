import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, first, take
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';
import { RxJsLoggingLevel , debug} from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId:number;

    course$ : Observable<Course>;

    lessons$: Observable<Lesson[]>;

    course: Course;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute, private store: Store) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];

        this.course$ = this.store.selectCourseById(this.courseId);//long runing observable
        //.pipe(take(2));
        //forkJoin(this.course$,this.loadLessons()).subscribe(res=>console.log('aqui fork',res));

        // cuando tenemos un observable que no termina y necesitamos forzar el completado
        // podemos usar first para obtener elprimer resultado
        // podemos usar take(2) para forzar el completado despues de determinada cantidad de items
       

        this.loadLessons()
        .pipe(
            withLatestFrom(this.course$)
        ).subscribe(([lesson,course])=>{
            console.log('lesson',lesson),
            console.log('course',course);
        })
        // combina el observable load leson con el ultimo valor que reciba de course
    }

    ngAfterViewInit() {

        this.lessons$ = fromEvent<any>(this.input.nativeElement,'keyup')
        .pipe(
            map((event:any)=> event.target.value),
            startWith(''),
            debug(RxJsLoggingLevel.INFO,'search'),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(search=> this.loadLessons(search))
        );
       

    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(
            `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
            .pipe(
                map(res => res["payload"])
            );
    }


}











