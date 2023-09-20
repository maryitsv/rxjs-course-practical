import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { fromEvent, noop } from 'rxjs';
import { concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Store } from '../common/store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course: Course;

    @ViewChild('saveButton', { static: true, read: ElementRef }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course,
        private store: Store) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });

    }

    ngOnInit() {
        this.form.valueChanges.pipe(
            filter(() => this.form.valid),
            //concatMap( changes => this.saveCourse(changes))
            mergeMap( changes => this.saveCourse(changes))
        ).subscribe();
    }

    ngAfterViewInit() {
        fromEvent(this.saveButton.nativeElement,'click')
        .pipe(
            exhaustMap(changes=> this.saveCourse(this.form.value)))
        .subscribe();

        console.log('after view init');
    }

    saveCourse(changes) {
        return fromPromise(
            fetch('/api/courses/' + this.course.id,
                {
                    method: 'PUT',
                    body: JSON.stringify(changes),
                    headers: { 'content-type': 'application/json' }
                },
            ));
    }
    save() {

        /*this.store.saveCourse(this.course.id, this.form.value)
            .subscribe(
                () => this.close(),
                err => console.log("Error saving course", err)
            );*/
    }




    close() {
        this.dialogRef.close();
    }


}
