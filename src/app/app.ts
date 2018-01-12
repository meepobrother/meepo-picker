import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeComponent } from './date-time/date-time';
import { UuidModule } from 'meepo-uuid';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DateTimeComponent
    ],
    imports: [
        CommonModule,
        UuidModule,
        ReactiveFormsModule
    ],
    exports: [
        DateTimeComponent
    ],
    providers: [],
})
export class PickerModule { }
