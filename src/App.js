import './App.css'
import Header from './features/header/Header'
import Todo from './features/body/TodoList'
import Footer from './features/footer/Footer'

function App() {
  return (
    <div className="container">
      <Header />
      <Todo />
      <Footer />
    </div>
  )
}

export default App
