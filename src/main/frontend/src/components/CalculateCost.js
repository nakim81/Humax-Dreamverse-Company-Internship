import moment from 'moment';

const CalculateCost = (perTimeFirst, perTimeAfter, timeCostFirst, timeCostAfter, dayCost, startTime, endTime) =>{

    var duration = Math.floor(moment.duration(endTime.diff(startTime)).asMinutes());
    if(dayCost != null){
            var cost = dayCost * Math.floor(duration/1440);
            duration = duration % 1440;
    }

    var timeCost = timeCostFirst;
    duration = duration - perTimeFirst;
    if(duration > 0){
        timeCost = timeCost + timeCostAfter * Math.ceil(duration/perTimeAfter);
    }

    if(dayCost!=null && dayCost < timeCost ){
        return cost + dayCost;
    }
    else{
        return cost + timeCost;
    }
};
export default CalculateCost;