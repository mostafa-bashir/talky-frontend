import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthScreens from './Auth/AuthScreens';
import Chats from './Core/Chats';

function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route exact path="/" element={<AuthScreens />} />
       <Route exact path="/chats" element={<Chats />} />
     </Routes>
    </BrowserRouter>


  );
}

export default App;


/* <BrowserRouter>
<Routes>

  <Route exact path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/createblog" element={<CreateBlog />} />
  <Route path="/allblogs" element={<AllBlogs />} />
  <Route path="/myblogs" element={<MyBlogs />} />
</Routes>
</BrowserRouter> */