import {
    Component, OnInit, HostListener,
    ViewEncapsulation, Input,
    Output, EventEmitter, AfterViewInit, AfterContentInit,
    ViewChild, ElementRef
} from '@angular/core';
import MobileSelect from 'mobile-select';
import { UuidService } from 'meepo-uuid';
export class MyMobileSelect extends MobileSelect {
    constructor(cfg: any) {
        super(cfg);
    }

    init(cfg: any) {
        console.log(typeof cfg.trigger);
        if (typeof cfg.trigger === 'string') {
            super.init(cfg);
        } else {
            let id = cfg.trigger.id;
            cfg.trigger = '#' + id;
            super.init(cfg);
        }
    }
}
@Component({
    selector: '[dateTime]',
    templateUrl: './date-time.html',
    styleUrls: ['./date-time.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DateTimeComponent implements OnInit, AfterViewInit, AfterContentInit {
    picker: any;
    @ViewChild('picker') _picker: ElementRef;
    @Input()
    set dateTime(val: string) {
        if (val) {
            if (this.picker) {
                this.picker.setTitle(val);
            } else {
                this.cfg.title = val;
            }
        }
    }

    @Output() onPicker: EventEmitter<any> = new EventEmitter();

    cfg: any = {
        title: '请选择日期',
        wheels: [],
        position: [0, 2],
        keyMap: {
            id: 'id',
            value: 'title',
            childs: 'children'
        },
        callback: (indexArr, data) => {
            let res = { ...data[0].value, ...data[1].value };
            this.onPicker.next(res);
        }
    };

    @HostListener('click', ['$event'])
    onOpen() {
        this.picker.show();
    }
    id: any = new Date().getTime();
    constructor(
        public uuid: UuidService
    ) {
        this.id = this.uuid.v1();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        let times = this.getTimes();
        let weeks = this.getWeeks();
        this.cfg.trigger = this._picker.nativeElement;
        this.cfg.wheels.push({ data: weeks }, { data: times });
        this.picker = new MyMobileSelect(this.cfg);
    }

    ngAfterContentInit() { }

    getTimes() {
        // 从现在到24点
        let times: any[] = [];
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        for (let i = hour; i < 24; i++) {
            let i_str = this.toTenStr(i);
            let minutesItems = [0, 15, 30, 45];
            minutesItems.map(j => {
                let j_str = this.toTenStr(j);
                times.push({
                    id: `${this.id}-time-${i}`,
                    value: {
                        hour: i,
                        minute: j
                    },
                    title: `${i_str}:${j_str}`
                })
            });
        }
        return times;
    }

    toTenStr(i) {
        if (i < 10) {
            return `0${i}`;
        } else {
            return `${i}`;
        }
    }

    getWeeks() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        let resultes = [];
        let day = now.getDate();
        for (let i = day; i < day + 7; i++) {
            let time = new Date();
            let j = 7 - (day + 7) + i;
            time.setDate(time.getDate() + j);
            resultes.push({
                id: `${this.id}-week-${i}`,
                value: {
                    year: year,
                    month: month,
                    day: time.getDay()
                },
                title: weeks[time.getDay()]
            });
        }
        return resultes;
    }
}
