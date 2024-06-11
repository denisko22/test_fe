import React from 'react';
import { Provider } from 'react-redux';
import  store  from './redux/store';
import ProductList from './components/ProductList';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductList />
      </div>
    </Provider>
  );
}

export default App;
