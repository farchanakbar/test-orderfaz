import SearchBar from "./components/SearchBar";
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import SearchBarDetail from "./components/SearchBarDetail";

const router = createBrowserRouter([
  {path: '/', element: <SearchBar />},
  {path: '/detail/:id', element: <SearchBarDetail />},
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
