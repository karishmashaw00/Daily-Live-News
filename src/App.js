import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Watch from "./components/Watch";
import Feed from "./components/Feed";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body/>,
    children:[
      {
        path: "/",
        element: <Feed/>
      },
      {
        path: "/watch",
        element: <Watch/>
      }
    ]
  }
])

function App(){
  return (
      <div>
        <Navbar/>
        <RouterProvider router={appRouter}/>
      </div>
    
    
  );
}

export default App;


