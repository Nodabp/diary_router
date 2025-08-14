import Header from "../component/Header.jsx";
import {Button} from "../component/Button.jsx";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App.jsx";
import {getMonthRangeByDate} from "../util.js";
import Diary from "./Diary.jsx";
import DiaryList from "../component/DiaryList.jsx";

export function Home() {
    const data = useContext(DiaryStateContext);
    const [pivotData, setPivotData] = useState(new Date());
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        if (data) {
            const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotData);
            setFilteredData(
                data.filter(item => item.date >= beginTimeStamp && item.date <= endTimeStamp))
        } else {
            setFilteredData([])
        }
    }, [data, pivotData])

    const onIncreaseMonth = () => {
        setPivotData(new Date(pivotData.getFullYear(), pivotData.getMonth() + 1));
    };

    const onDecreaseMonth = () => {
        setPivotData(new Date(pivotData.getFullYear(), pivotData.getMonth() - 1));
    };

    return (
        <div>
            <Header
                title={`${pivotData.getFullYear()}년 ${pivotData.getMonth() + 1}월`}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} type="nav"/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} type="nav"/>}
            />
            <DiaryList
                data={filteredData}
            />
        </div>
    );
}