import './App.css';
import SearchForm from "./SearchForm";
import store from "./redux/store/store";
import { Provider } from 'react-redux'

const App = () => {

  return (
    <Provider store={store}>
      <SearchForm/>
    </Provider>
  );
}

export default App;
