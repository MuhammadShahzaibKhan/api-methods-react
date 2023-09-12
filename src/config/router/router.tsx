import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Comments from "../../pages/comments";
import AddComments from "../../pages/addComment";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Comments />} />
          <Route path="add/" element={<AddComments />} />
          <Route path="add/:id" element={<AddComments />} />
        </Routes>
      </Router>
    </>
  );
}
