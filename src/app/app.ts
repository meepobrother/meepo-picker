import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeComponent } from './date-time/date-time';
@NgModule({
    declarations: [
        DateTimeComponent
    ],
    imports: [ CommonModule ],
    exports: [
        DateTimeComponent
    ],
    providers: [],
})
export class PickerModule {}
