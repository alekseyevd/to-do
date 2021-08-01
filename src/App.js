import './App.css'
import { Layout } from './components/Layout'
import { Provider } from './core/Provider'

function App() {
  return (
    <Provider>
      <Layout/>
    </Provider>
  )
}

export default App;
