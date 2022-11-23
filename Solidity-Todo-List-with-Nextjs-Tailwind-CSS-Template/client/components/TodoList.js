import Navbar from "./Navbar";
import Task from "./Task";
import { IoMdAddCircle } from "react-icons/io";

const TodoList = ({ tasks, setInput, addTask, deleteTask }) => (
  <div className="w-[70%] bg-[#354ea3] py-4 px-9 rounded-[30px] overflow-y-scroll">
    <Navbar />
    <h2 className="text-4xl bolder text-white pb-8">What&apos;s up, Kevin!</h2>
    <div className="py-3 text-[#7d99e9]">TODAY&apos;S TASKS</div>
    <form className="flex items-center justify-center">
      <input
        className="rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]"
        placeholder="Add a task for today..."
        // take input from the form here
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <IoMdAddCircle
        // Add an onClick method
        className="text-[#ea0aff] text-[50px] cursor-pointer ml-[20px] mb-[10px]"
        onClick={addTask}
      />
    </form>
    <ul>
      {tasks.map((item) => (
        <Task
          key={item.id}
          taskText={item.taskText}
          deleteTask={deleteTask(item.id)}
        />
      ))}
    </ul>
  </div>
);

export default TodoList;