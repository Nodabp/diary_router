import {useNavigate} from "react-router-dom";
import Header from "../component/Header.jsx";
import {Button} from "../component/Button.jsx";
import Editor from "../component/Editor.jsx";
import {useContext} from "react";
import {DiaryDispatchContext} from "../App.jsx";

export default function New () {
    const navigate = useNavigate();

    const {onCreate} =useContext(DiaryDispatchContext);

    const goBack = () => {
        navigate(-1)
    }

    const onSubmit = (data) => {
        const {date, emotionId, content} = data;
        onCreate(date, content, emotionId)
        navigate('/',{replace: true})
    }

    return (
        <div>
            <Header title={'진지하게 새일기 쓰기'}
                    leftChild={<Button text={'< 뒤로가기'} onClick={goBack}/>}
            />
            <Editor onSubmit={onSubmit}/>
        </div>
    )
}