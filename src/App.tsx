import Home from "./pages/Home/Home";
import classes from "./App.module.css";
import { FormEvent, useRef } from "react";
import CityDetails from "./pages/CityDetails/CityDetails";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const searchValue = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`${searchValue.current?.value}`);
  };

  return (
    <div className='App'>
      <form className={classes["search-form"]} onSubmit={handleSubmit}>
        <input
          ref={searchValue}
          type='search'
          placeholder='Search for a location'
          className={classes["search-input"]}
        />
      </form>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:city' element={<CityDetails />} />
      </Routes>
    </div>
  );
};

export default App;
