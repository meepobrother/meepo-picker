import { Component, OnInit, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const EXE_COUNTER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
};
@Component({
    selector: 'time-picker',
    templateUrl: './time-picker.html',
    styleUrls: ['./time-picker.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {
    @Input('now') isCoach: boolean = true;
    _model: any;
    set model(val: any) {
        this._model = val;
        this.propagateChange(this._model);
    }
    get model() {
        return this._model;
    }
    constructor(
        public cd: ChangeDetectorRef
    ) { }

    ngOnInit() {

    }

    doNow() {
        setTimeout(() => {
            this.isCoach = false;
        }, 0);
    }

    doCoach() {
        setTimeout(() => {
            this.isCoach = true;
        }, 0);
    }

    timePicker(e: any) {
        this.model = e;
    }

    propagateChange = (_: any) => { };

    writeValue(value: any) {
        if (value) {
            this.model = value;
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) { }
}