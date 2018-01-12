import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeComponent } from './date-time/date-time';
import { TimePickerComponent } from './time-picker/time-picker';

import { UuidModule } from 'meepo-uuid';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DateTimeComponent,
        TimePickerComponent
    ],
    imports: [
        CommonModule,
        UuidModule,
        ReactiveFormsModule
    ],
    exports: [
        DateTimeComponent,
        TimePickerComponent
    ],
    providers: [],
})
export class PickerModule { }
