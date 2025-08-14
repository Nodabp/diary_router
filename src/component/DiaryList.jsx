import "./DiaryList.css"
import {Button} from "./Button.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Diary from "../pages/Diary.jsx";
import DiaryItem from "./DiaryItem.jsx";

const sortOptionList = [
    {value: "lastest", name: "최신순"},
    {value: "oldest", name: "오래된순"},
]


export default function DiaryList({data}) {

    const [sortType, setSortType] = useState("lastest")

    const [sortedData, setSortedData] = useState([]) // 정렬 결과를 저장할 state

    useEffect(() => {
        const compare = (a, b) => {
            // 정렬하기 위한 비교 함수
            if (sortType === "lastest") {
                return Number(b.date) - Number(a.date)
            } else {
                return Number(a.date) - Number(b.date)
            }
        }

        // 배열의 sort 메서드는 원본 배열을 정렬함.

        const copyList = JSON.parse(JSON.stringify(data)) // 배열을 복사해 copyList에 저장하기
        copyList.sort(compare)
        setSortedData(copyList)

    },[data, sortType])

    const onChangeSortType = (e) => {
        setSortType(e.target.value)
    }
    const navigate = useNavigate();

    const onclickNew = ()=>{
        navigate("/new")
    }

    return (
        <div className="DiaryList">
            <div className={'menu_wrapper'}>

                <div className={'left_col'}>
                    <select value={sortType} onChange={onChangeSortType}>
                        { sortOptionList.map((option,index) => (
                            <option key={index} value={option.value}>{option.name}</option>
                        ))}
                    </select>
                </div>


                <div className={'right_col'}>
                    <Button type={'positive'} text={'진지하게 새 일기 쓰기'} onClick={onclickNew}/>
                </div>
            </div>
            <div className={'list_wrapper'}>
                {
                    sortedData.map((item, index) => (
                        <DiaryItem key={index} {...item}/>
                    ))
                }
            </div>

        </div>
    )
}
