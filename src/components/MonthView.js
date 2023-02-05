import '../css/MonthVIew.css';

import DayOfMonth from './MonthView/DayOfMonth'
import moment, {months} from "moment";

function MonthView(props) {

    const totalDays=42
    const daysArray=[...Array(42)]

    let startDay=props.startDay.clone()
    startDay.add(props.calShift,"month")
    let selectedMonth = startDay.clone()
    startDay=startDay.startOf('month').startOf('week')

    const endDay=startDay.clone()
    endDay.add(42,'day')

    const calendar =[]

    let weekArray = []
/*
* Similarly, moment.monthsShort returns abbreviated month names,
* and moment.weekdays, moment.weekdaysShort, moment.weekdaysMin return lists of weekdays.

You can pass an integer into each of those functions to get a specific month or weekday.
* */
    if(props.isWeekDaysShort){
        weekArray = moment.weekdaysShort();
    }
    else{
        weekArray = moment.weekdays();
    }

    if(props.firstDayMon) {
        weekArray=weekArray.splice(1).concat(weekArray);
    }
    for (let i = 0; i < weekArray.length; i++) {
        weekArray[i] = weekArray[i].charAt(0).toUpperCase() + weekArray[i].slice(1)
    }


    const day = startDay.clone()

    while(day.isBefore(endDay)){  //isBefore(end)
        calendar.push(day.clone())
        day.add(1,'day')
    }
    return (
        <div className="Calendar">
            <div className="MonthView" >
                {
                    weekArray.map((dayOfWeek,idx)=>(
                        <DayOfMonth  day={dayOfWeek} key={idx} isHeader/>
                    ))
                }
                {calendar.map(dayItem => (
                    <DayOfMonth  day={dayItem.format('D')} isToDay={moment().isSame(dayItem,'day')} isWeekend={(dayItem.day()==6||dayItem.day()===0)} isOtherMonth={!selectedMonth.isSame(dayItem,'month')}  key={dayItem.format('DDMMYY')}/>
                    ))
                }

            </div>
        </div>
    );
}


export default MonthView