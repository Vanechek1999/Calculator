import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import Calculate from './pages/calculate';
import Authorization from './pages/authorization';
import './firebase'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/calculate' element={<Calculate/>} />
          <Route path='/login' element={<Authorization/>} />
        </Routes>
    </Router>
  );
}

export default App;
