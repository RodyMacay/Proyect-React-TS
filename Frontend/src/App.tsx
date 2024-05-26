import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Users/Login';
import TaskList from './components/TaskList';
import { AuthProvider } from './context/UserContext';
import './index.css';
import UpdateTaskPage from './components/EditTaskPage.';
import AddTaskPage from './components/AddTask';
import RegisterUser from './components/Users/RegisterUser';
import PrivateRoute from './components/PrivateRouters';
import ProfileUser from './components/Users/UserProfile';
import { AuthProviderTask } from './context/TaskContext';
/* import Navbar from './components/Navbar';
 */
function App() {  

  return (
    <div>
    <BrowserRouter> 
      <AuthProvider>    
            <AuthProviderTask>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<RegisterUser/>}/>
          <Route element= { <PrivateRoute/> } >
            <Route path='profile' element = { <ProfileUser/> }/>
            <Route path='/' element={<TaskList/>}/>
            <Route path="/edit-task/:taskId" element={<UpdateTaskPage />} />
            <Route path="/addTask" element={<AddTaskPage />} />

          </Route>
        </Routes>
            </AuthProviderTask>
        {/* <h1 className='text-center text-gray-800 font-bold bg-slate-400'>Hello word  ts</h1> */}
        {/* <TaskList/>
        <Login/> */}
      </AuthProvider>
    </BrowserRouter>
    </div>
  )
}

export default App;
