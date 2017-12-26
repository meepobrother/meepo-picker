import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeComponent } from './date-time/date-time';
import { UuidModule } from 'meepo-uuid';
@NgModule({
    declarations: [
        DateTimeComponent
    ],
    imports: [ CommonModule, UuidModule ],
    exports: [
        DateTimeComponent
    ],
    providers: [],
})
export class PickerModule {}
