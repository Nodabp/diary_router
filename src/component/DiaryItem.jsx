import './DiaryItem.css'
import {getEmotionById} from "../util.js";
import {useNavigate} from "react-router-dom";
import {Button} from "./Button.jsx";

export default function DiaryItem({id, emotionId, content, date}) {

    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`)
    }

    const goEdit = () => {
        navigate(`/edit/${id}`)
    }


    return (
        <div className={'DiaryItem'}>
            <div onClick={goDetail}
            className={['img_section', `img_section_${emotionId}`].join(' ')}>
                <img alt={`emotion${emotionId}`} src={getEmotionById(emotionId)}/>
            </div>
            <div onClick={goDetail} className={'info_section'}>
                <div className={'date_wrapper'}>
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                <div className={'content_wrapper'}>
                    {content.length >= 25 ? content.slice(0, 25) + "..." : content}
                </div>
            </div>
            <div className={'btn_section'}>
                <Button text={'수정하기'} onClick={goEdit}/>
            </div>
        </div>
    )
}