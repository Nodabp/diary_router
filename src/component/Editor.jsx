import './editor.css'
import {useEffect, useState} from "react";
import {emotionList, getFormattedDate} from "../util.js";
import {Button} from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import EmotionItem from "./EmotionItem.jsx";

export default function Editor({initData, onSubmit}) {
    const navigate = useNavigate();


    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: '',
    })

    useEffect(() => {
        if(initData) {
            setState({ ...initData,
            date: getFormattedDate(new Date(initData.date))})
        }
    },[initData])


    const handleChangeDate = (e) => {
        setState({...state, date: e.target.value})
    }
    const handleChangeContent = (e) => {
        setState({...state, content: e.target.value})
    }
    const handleChangeEmotion = (emotionId) => {
        setState({...state, emotionId,})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(state);
    }
    const handleGoback = () => {
        navigate(-1)
    }


    return (
        <div className="Editor">
            <div className="editor_section">
                {/* 날짜 */}
                <h4>진지한 오늘의 날짜</h4>
                <div className={"input_wrapper"}>
                    <input type="date" value={state.date} onChange={handleChangeDate}/>
                </div>
            </div>
            <div className="editor_section">
                {/* 감정 */}
                <h4>오늘의 감정</h4>
                <div className={"input_wrapper emotion_list_wrapper"}>
                    {emotionList.map((emotion) => (
                        <EmotionItem key={emotion.id}{...emotion}
                                    onClick={handleChangeEmotion}
                                    isSelected={emotion.id === state.emotionId}/>
                    ))}
                </div>
            </div>
            <div className="editor_section">
                {/* 일기 */}
                <h4>오늘의 일기</h4>
                <div className={"input_wrapper"}>
                    <textarea placeholder={"오늘은 어떠셨나요~"}
                              value={state.content}
                              onChange={handleChangeContent}/>
                </div>
            </div>
            <div className="editor_section">
                {/* 작성완료, 취소 */}
                <Button text={"취소하기"} onClick={handleGoback}/>
                <Button text={"작성완료"} type={"positive"} onClick={handleSubmit}/>
            </div>
        </div>
    );
}