import {useNavigate, useParams} from "react-router-dom";
import useDiary from "../hooks/useDiary.js";
import {getFormattedDate} from "../util.js";
import Header from "../component/Header.jsx";
import {Button} from "../component/Button.jsx";
import {Viewer} from "../component/Viewer.jsx";

export function Diary() {
    const {id} = useParams();
    const data = useDiary(id);


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }


    if (!data) {
        return <div>Loading...</div>
    }
    const {date, content, emotionId} = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`
    return (
        <div>
            <Header title={title}
                    leftChild={<Button text={'< 뒤로가기'} onClick={goBack}/>}
                    rightChild={<Button text={'수정하기'} onClick={goEdit}/>}
            />
            <Viewer content={content} emotionId={emotionId}/>
        </div>
    )
}


export default Diary;