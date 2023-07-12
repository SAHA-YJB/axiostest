import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:4001/todos");
    console.log(data);
    setTodos(data);
  };
  useEffect(() => {
    //db에서 값 가져오기
    fetchTodos();
  }, []);

  return (
    <div>
      {todos?.map((item) => {
        return (
          <div key={item.id}>
            {item.id}:{item.title}
          </div>
        );
      })}
    </div>
  );
}

export default App;
