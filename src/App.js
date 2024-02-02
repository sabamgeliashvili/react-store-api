// App.js
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './images/logo.png';

function Home() {
  return (
    <div className="bg flex items-center justify-center">
      <i><h1 className="text-white text-6xl">Find your taste here</h1></i>
    </div>
  );
}


function Products() {
  let [products, setProducts] = useState([])
  let [totalPrice,setTotalPrice] = useState(0)
  const [lastBoughtItem, setLastBoughtItem] = useState('');
  const [boughtItems, setBoughtItems] = useState([]);

  function fetchData() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json))
      .catch(error => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    fetchData();
  }, []); 



  function buyItem(price, pname) {
    setTotalPrice(totalPrice + price);
    setLastBoughtItem(pname);
    setBoughtItems([...boughtItems, pname]);
  }


return (
  <div className="mt-20 p-4 grid grid-cols-2 gap-y-28 gap-x-52 justify-between">
    <h1 className="font-bold">your total price:${totalPrice}</h1>
    <h1>Last Bought Item: {lastBoughtItem}</h1>
    <h2>Bought Items: {boughtItems.join(', ')}</h2>
     {products.map(product => (
        <div key={product.id} className="mb-4">
          <img src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-2" />
          <i><h2 className="text-lg font-extrabold">{product.title}</h2></i>
          <p className="font-bold">${product.price}</p>
          <button onClick={() => buyItem(product.price,product.title)} className="bg-green-600 w-24 rounded-md">
            $Buy
          </button>
        </div>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <form className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="your name"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="your email"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Write your message here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

function App() {


  return (
    <Router>
      <div className="App">
        <header className="app-header w-full flex h-20 bg-fuchsia-950 items-center fixed left-0 top-0">
          <Link to="/"><img className='logo' src={logo} alt='logo'/></Link>
          <nav className="flex items-center w-full">
            <ul className="flex">
              <li className="mr-4 text-gray-400 hover:text-white transition-all cursor-pointer ml-4 font-bold">
                <Link to="/">Home</Link>
              </li>
              <li className="mr-4 text-gray-400 hover:text-white transition-all cursor-pointer font-bold">
                <Link to="/products">Products</Link>
              </li>
              <li className='mr-4 text-gray-400 hover:text-white transition-all cursor-pointer font-bold'>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
