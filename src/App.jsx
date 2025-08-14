import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import { Home } from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import Edit from "./pages/Edit.jsx";
import Diary from "./pages/Diary.jsx";

// 상태와 디스패치 Context 생성
export let DiaryStateContext;
DiaryStateContext = React.createContext();
export let DiaryDispatchContext;
DiaryDispatchContext = React.createContext();

// reducer 함수 정의
function reducer(state, action) {
    switch (action.type) {
        case "CREATE":
            return [action.data, ...state];
        case "UPDATE":
            return state.map(item =>
                String(item.id) === String(action.data.id) ? { ...action.data } : item
            );
        case "DELETE":
            return state.filter(item => String(item.id) !== String(action.targetId));
        case "INIT":
            return action.data;
        default:
            return state;
    }
}

function App() {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [data, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);

    // 초기 mock 데이터
    const mockData = [
        {
            id: 'mock1',
            date: new Date().getTime() -1,
            content: 'mock1',
            emotionId: 1,
        },
        {
            id: 'mock2',
            date: new Date().getTime() -2,
            content: 'mock2',
            emotionId: 2,
        },
        {
            id: 'mock3',
            date: new Date().getTime() -3,
            content: 'mock3',
            emotionId: 3,
        },
    ];

    useEffect(() => {
        dispatch({
            type: "INIT",
            data: mockData
        });
        setIsDataLoaded(true);
    }, []);

    // 일기 생성
    const onCreate = (date, content, emotionId) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
        idRef.current += 1;
    };

    // 일기 수정
    const onUpdate = (targetId, date, content, emotionId) => {
        dispatch({
            type: "UPDATE",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
    };

    // 일기 삭제
    const onDelete = (targetId) => {
        dispatch({
            type: "DELETE",
            targetId,
        });
    };

    // 로딩 중 화면
    if (!isDataLoaded) {
        return <div>Loading...</div>;
    }

    // 실제 앱 렌더링
    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<New />} />
                            <Route path="/diary/:id" element={<Diary />} />
                            <Route path="/edit/:id" element={<Edit />} />
                        </Routes>
                    </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;