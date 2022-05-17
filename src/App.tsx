import Dashboard from './components/dashboard/dashboard';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import { BrowserRouter,Routes, Route } from "react-router-dom"
import { AdminsProvider } from './context/adminContext';
import { MainOrder } from './components/order/order';

function App() {
  return (
    <AdminsProvider>
      <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/order" element={<MainOrder />}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    </AdminsProvider>
  );
}

export default App;
