import { Component, OnInit, HostListener, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import MobileSelect from 'mobile-select';

@Component({
    selector: '[dateTime]',
    template: `<div id="date_time">
    <ng-content></ng-content>
</div>`,
    styles: [`.mobileSelect {
  position: relative;
  z-index: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s, z-index 0.4s; }

.mobileSelect * {
  margin: 0;
  padding: 0;
  box-sizing: border-box; }

.mobileSelect .grayLayer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #eee;
  background: rgba(0, 0, 0, 0.7);
  z-index: 888;
  display: block; }

.mobileSelect .content {
  width: 100%;
  display: block;
  position: fixed;
  z-index: 889;
  color: black;
  transition: all 0.4s;
  bottom: -350px;
  left: 0;
  background: white; }

.mobileSelect .content .fixWidth {
  width: 90%;
  margin: 0 auto;
  position: relative; }

.mobileSelect .content .fixWidth:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden; }

.mobileSelect .content .btnBar {
  border-bottom: 1px solid #DCDCDC;
  font-size: 15px;
  height: 45px;
  position: relative;
  text-align: center;
  line-height: 45px; }

.mobileSelect .content .btnBar .cancel,
.mobileSelect .content .btnBar .ensure {
  height: 45px;
  width: 55px;
  cursor: pointer;
  position: absolute;
  top: 0; }

.mobileSelect .content .btnBar .cancel {
  left: 0;
  color: #666; }

.mobileSelect .content .btnBar .ensure {
  right: 0;
  color: #1e83d3; }

.mobileSelect .content .btnBar .title {
  font-size: 15px;
  padding: 0 15%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; }

.mobileSelect .content .panel:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden; }

.mobileSelect .content .panel .wheels {
  width: 100%;
  height: 200px;
  overflow: hidden; }

.mobileSelect .content .panel .wheel {
  position: relative;
  z-index: 0;
  float: left;
  width: 50%;
  height: 200px;
  overflow: hidden;
  transition: width 0.3s ease; }

.mobileSelect .content .panel .wheel .selectContainer {
  display: block;
  text-align: center;
  transition: -webkit-transform 0.18s ease-out;
  transition: transform 0.18s ease-out;
  transition: transform 0.18s ease-out, -webkit-transform 0.18s ease-out; }

.mobileSelect .content .panel .wheel .selectContainer li {
  font-size: 15px;
  display: block;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; }

.mobileSelect .content .panel .selectLine {
  height: 40px;
  width: 100%;
  position: absolute;
  top: 80px;
  pointer-events: none;
  box-sizing: border-box;
  border-top: 1px solid #DCDCDC;
  border-bottom: 1px solid #DCDCDC; }

.mobileSelect .content .panel .shadowMask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0), #ffffff);
  opacity: 0.9;
  pointer-events: none; }

.mobileSelect-show {
  opacity: 1;
  z-index: 10000;
  visibility: visible; }

.mobileSelect-show .content {
  bottom: 0; }
`],
    encapsulation: ViewEncapsulation.None
})

export class DateTimeComponent implements OnInit {
    @Input() dateTime(val: string) {
        if (val) {
            this.cfg.title = val;
        }
    }
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
            console.log(indexArr, data);
        }
    };
    @HostListener('click', ['$event'])
    onOpen() {
        var mobileSelect1 = new MobileSelect(this.cfg);
        console.log(mobileSelect1);
        mobileSelect1.show();
    }
    constructor(
        public ele: ElementRef
    ) { }

    ngOnInit() {
        let times = getTimes();
        let weeks = getWeeks();
        this.cfg.wheels.push({ data: weeks }, { data: times });
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
        time.setDate(time.getDate()+j);
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