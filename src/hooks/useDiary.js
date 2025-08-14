import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App.jsx";
import {useNavigate} from "react-router-dom";

const useDiary = id => {

    const data = useContext(DiaryStateContext);
    const [diary,setDiary] = useState();
    const navigator = useNavigate();
    console.log(diary)

    //useEffect 를 이용해 id나 data의 값이 변경될 때 마다
    // 일기 데이터에서 매개변수 id 와 일치하는 일기를 찾아 state 값 diary 를 업데이트!

    useEffect(() => {
        const matchDiary = data.find(item => String(item.id) === String(id));
        if(matchDiary) {
            setDiary(matchDiary);
        }else{
            alert("해당 일기가 존재하지 않아요")
            navigator('/',{replace: true}) // 현제의 주소를 싹다 컷
        }
    }, [id]);
    return diary;
}

export default useDiary;