import {useNavigate, useParams} from "react-router-dom";
import useDiary from "../hooks/useDiary.js";
import Header from "../component/Header.jsx";
import {Button} from "../component/Button.jsx";
import {useContext} from "react";
import {DiaryDispatchContext} from "../App.jsx";
import Editor from "../component/Editor.jsx";

export default function Edit() {
    const {id} = useParams();
    const data = useDiary(id);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext);

    const onClickDelete = () => {
        if(window.confirm('일기를 진짜 삭제 하시겠습니까 ?')){
            onDelete(id)
            navigate('/', {replace: true})
        }
    }
    const onSubmitUpdate = (data) => {
        const {id ,date, emotionId, content} = data;
        onUpdate(id, date, content, emotionId)
        navigate('/',{replace: true})
    }

    if (!data) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Header title={'일기 수정하기'}
                    leftChild={<Button text={'< 뒤로가기'} onClick={goBack}/>}
                    rightChild={<Button text={'삭제하기'} type={'negative'} onClick={onClickDelete}/>}
            />
            <Editor initData={data} onSubmit={onSubmitUpdate}/>
            <h1>Edit 페이지 입니다..</h1>
        </div>
    )
}