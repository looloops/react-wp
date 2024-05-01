import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MyNav from "./components/MyNav";
import PostDetails from "./components/PostDetails";
import NewPost from "./components/NewPost";

import "bootstrap/dist/css/bootstrap.min.css";
import EditPost from "./components/EditModal";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/form" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
