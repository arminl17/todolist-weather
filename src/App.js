import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Weather from './components/Weather'
function App() {
  return (
    <>
    <Weather/>
    <div className="todo-app">
        
        <TodoList />
    </div>
  </>
  );
}

export default App;
