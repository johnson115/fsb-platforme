// App.js
import Home from './component/home';
import { Route, Routes } from "react-router-dom";
import Events from './pages/events';
import Feedback from './pages/feedback';
import Drawer from './component/Drawer';
import CreatePost from './pages/createPost';

function App() {
  return (
    <>
      <div className="container">
        <Drawer />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateNewPost" element={<CreatePost />} />
            <Route path="/AvailbleEvents" element={<Events />} />
            <Route path="/WriteFeedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
