import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [edit, setEdit] = useState("");

  //get
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:4001/todos");
    console.log(data);
    setTodos(data);
  };
  useEffect(() => {
    //db에서 값 가져오기
    fetchTodos();
  }, []);

  //post
  const onSubmitHandler = async () => {
    axios.post("http://localhost:4001/todos", inputValue);
    // setTodos([...todos, inputValue]);
    fetchTodos();
  };

  //delete
  const onDeleteBtnHandler = async (id) => {
    axios.delete(`http://localhost:4001/todos/${id}`);
    setTodos(todos.filter((item) => item.id !== id));
  };
  //patch
  const onUpdateBtnHandler = async () => {
    axios.patch(`http://localhost:4001/todos/${targetId}`, {
      title: edit,
    });
    setTodos(
      todos.map((item) => {
        if (item.id == targetId) {
          return { ...item, title: edit };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <>
      <div>
        <div>
          {/* 수정영역 */}
          <input
            placeholder="id입력"
            value={targetId}
            onChange={(e) => {
              setTargetId(e.target.value);
            }}
          />
          <input
            placeholder="수정내용"
            value={edit}
            onChange={(e) => {
              setEdit(e.target.value);
            }}
          />
          <button onClick={onUpdateBtnHandler}>수정</button>
        </div>
        {/* 인풋영역 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            //버튼 클릭 시 input의 값을 이용해 디비에 저장 post
            onSubmitHandler();
          }}
        >
          <input
            type="text"
            value={inputValue.title}
            onChange={(e) => {
              setInputValue({ title: e.target.value });
            }}
          />
          <button type="submit">추가</button>
        </form>
      </div>
      {/* 데이터영역 */}
      {todos?.map((item) => {
        return (
          <div key={item.id}>
            {item.id}:{item.title}
            <button
              onClick={() => {
                onDeleteBtnHandler(item.id);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;
