import {
    Component, OnInit, HostListener,
    ViewEncapsulation, ElementRef, Input,
    Output, EventEmitter
} from '@angular/core';
import MobileSelect from 'mobile-select';

@Component({
    selector: '[dateTime]',
    templateUrl: './date-time.html',
    styleUrls: ['./date-time.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DateTimeComponent implements OnInit {
    picker: any;
    @Input() dateTime(val: string) {
        if (val) {
            this.cfg.title = val;
        }
    }

    @Output() onPicker: EventEmitter<any> = new EventEmitter();

    cfg: any = {
        trigger: '#date_time',
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

    constructor(
        public ele: ElementRef
    ) { }

    ngOnInit() {
        let times = getTimes();
        let weeks = getWeeks();
        this.cfg.wheels.push({ data: weeks }, { data: times });
        this.picker = new MobileSelect(this.cfg);
    }
}

export function getWeeks() {
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
            id: `week-${i}`,
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

export function toTenStr(i) {
    if (i < 10) {
        return `0${i}`;
    } else {
        return `${i}`;
    }
}

export function getTimes() {
    // 从现在到24点
    let times: any[] = [];
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    for (let i = hour; i < 24; i++) {
        let i_str = toTenStr(i);
        let minutesItems = [0, 15, 30, 45];
        minutesItems.map(j => {
            let j_str = toTenStr(j);
            times.push({
                id: `time-${i}`,
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