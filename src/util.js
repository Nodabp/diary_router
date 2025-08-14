import emotion1 from './img/emotion1.png';
import emotion2 from './img/emotion2.png';
import emotion3 from './img/emotion3.png';
import emotion4 from './img/emotion4.png';
import emotion5 from './img/emotion5.png';

export const getEmotionById = (emotionId) => {
    switch (emotionId) {
        case 1:
            return emotion1;
        case 2:
            return emotion2;
        case 3:
            return emotion3;
        case 4:
            return emotion4;
        case 5:
            return emotion5;
        default:
            return null;
    }
};

export const getFormattedDate = (targetDate) => {
    const year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    // 두 자리 숫자로 포맷팅
    month = month < 10 ? `0${month}` : `${month}`;
    date = date < 10 ? `0${date}` : `${date}`;

    return `${year}-${month}-${date}`;
};

export const emotionList = [
    {
        id: 1,
        name: "완전 좋음",
        img: getEmotionById(1),
    },
    {
        id: 2,
        name: "좋음",
        img: getEmotionById(2),
    },
    {
        id: 3,
        name: "그럭 저럭",
        img: getEmotionById(3),
    },
    {
        id: 4,
        name: "나쁨",
        img: getEmotionById(4),
    },
    {
        id: 5,
        name: "끔찍함",
        img: getEmotionById(5),
    }
];

export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(
        date.getFullYear(),
        date.getMonth(),
        1).getTime();
    const endTimeStamp = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0, 23, 59, 59).getTime()
    return {beginTimeStamp, endTimeStamp}
}