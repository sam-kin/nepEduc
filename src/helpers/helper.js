import {getDaysInMonth} from 'date-fns';

export const getArray = (len=0, start=0, end=0) => {
    let arr;
    if (len < 1) {
        if (end === 0) {
            return;
        }
        arr = new Array(end - start);
    } else {
        arr = new Array(len);
    }

    for (let i=start; i<(end===0? len: end); i++) {
        arr[i] = i;
    }

    return arr;
};

export const getMonthDays = ({m, y}) => {
    if (m > 12 || m < 1 || y < 1920 || y > 2020) {
        return;
    }
    const len = getDaysInMonth(new Date(y, m-1));
    return getArray(len);
};