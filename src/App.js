

import Home from './component/home';

import {

  Route,
  Routes,
} from "react-router-dom";
import CreatePost from './pages/createPost';
import Events from './pages/events';
import Feedback from './pages/feedback';
import Drawer from './component/Drawer';



function App() {
  return (
    <>
     <div className="container"> {/* Wrap both in a container */}
      <Drawer />
      <div className="main-content"> {/* Optional: for better styling separation */}
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
