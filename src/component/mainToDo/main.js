/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';
import React , {useEffect , useState, useContext } from 'react';
import { SettingsContext } from '../context/setting.js';
import uuid from 'uuid/v4';
import { When , If , Then , Else } from '../if/if.js';
import Modal from '../model/model.js';
import '../mainToDo/main.scss';
import Auth from '../auth/auth.js';
import cookie from 'react-cookies';
import superagent from 'superagent';

const ToDo = props => {

  const settingContext = useContext(SettingsContext);

  // because we use function here because that we use (useContext)
  //   //----------------------------------Hooks ----------------------------------------//
  const [todoList , setTodoList] = useState([]); // arr
  const [item , setItem] = useState({}); // i pass is as a object beause it's easy to use object proparty
  const [details , setDetails] = useState({}); //because each item have details
  const [showDetails , setShowDetails] = useState(false); // as initial value hide the details (I use this state in the toggle to show/hide)


  const API = process.env.REACT_APP_API;
  useEffect(() => { // similar to componentDidMount and componentDidUpadate
    let complete = todoList.filter(item => !item.complete).length; // true
    let incomplete = todoList.filter(item => item.complete).length; // false
    document.title = `ToDo:${complete} Done:${incomplete}`;

    // if(!settingContext.displayCompleted){
    //   return settingContext.displayCompleted(todoList.length);
    // }else{
    //   return settingContext.displayCompleted(todoList.length - complete);
    // }
  });

  const handleInputChange = e => { // make a copy of each item and add a new property with value to it
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const addItem = e => {
    e.preventDefault();
    // setTodoList([ ...todoList , item]); //---- so here I have problem that how can browser know that is a new item so I need to make a uniqe key to each item ---//
    const defaults = { key: uuid(), complete: false }; // make each id as a uniqe
    const newItem = Object.assign({}, item, defaults); // to copy propreties from one or more source of objects
    setTodoList([...todoList, newItem]); // to copy properity from one or more resoure of object
    setItem({});
    e.target.reset();
    // console.log(todoList);
  };

  const deleteItem = key => {
    setTodoList(todoList.filter(item => item.key !== key));
  };

  const saveItem = itemSaved => {
    setTodoList(
      // eslint-disable-next-line comma-dangle
      todoList.map(item => (item.key === itemSaved.key ? itemSaved : item))
    );
  };

  const toggleComplete = key => {
    let itemCompleted = todoList.filter(item => item.key === key)[0];
    if (itemCompleted.key) {
      itemCompleted.complete = !itemCompleted.complete;
      saveItem(item);
    }
  };

  const toggleDetails = key => {
    let showDetailsState = !showDetails;
    let itemDetails = todoList.filter(item => item.key === key)[0] || {}; //pass empty object because when the user went to close the details it will give us {}
    setDetails(itemDetails);
    setShowDetails(showDetailsState);
  };

  const toggleHideComleted = e => {
    if(e.target.name === 'hideCompleteButton'){
      settingContext.setDisplayCompleted(true);
    }
  };
  const handleLoginSubmit = (e) => { // this method we use it on submit the form of user info so we hite the APi and pass user info on it
    e.preventDefault();
    superagent //use Promise
      .post(`${API}/signin`)
      .auth(settingContext.username , settingContext.password)
      .set('mode' , 'cors')
      .then( result => {
        let token = result.text;
        login(token);
      })
      .catch(e => console.error(e));
  };
  const login = (token) => {
    cookie.save('auth' , token);
    settingContext.setUserToken(token);
    settingContext.setLogin(true);
  };

  const logout = () => {
    cookie.remove('auth');
    settingContext.setUserToken();
    settingContext.setLogin(false);
  };

  const handleLoginChange = (e) => {
    if(e.target.name === 'username'){
      settingContext.setUsername(e.target.value);
    }
    if(e.target.name === 'password'){
      settingContext.setPassword(e.target.value);
    }
  };


  return (
    <>
      <section className='login-form'>
        <If condition={settingContext.login}>
          <Then>
            <button onClick={logout}>LogOut</button>
          </Then>
          <Else>
            <form onSubmit={handleLoginSubmit}>
              <input name='username' placeholder='Enter username' onChange={handleLoginChange}/>
              <input name='password' placeholder='Enter your password please' onChange={handleLoginChange}/>
              <input name='submit' type='submit' value='login'/>
            </form>
          </Else>
        </If>
      </section>
      <section className="todo">
        <Auth capability='create'>
          <div>
            <form onSubmit={addItem}>
              <label>
                <span>ToDo Item :</span>
                <input name="text" placeholder="Add Item" onChange={handleInputChange}/>
              </label>
              <label>
                <span>Difficulty :</span>
                <input type="range" min="1" max="5" name="difficulty" defaultValue="3" className="difficulty" onChange={handleInputChange} />
              </label>
              <label>
                <span>Assigned To :</span>
                <input  type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
              </label>
              <label>
                <span>Date :</span>
                <input type="date" name="Time" onChange={handleInputChange} />
              </label>
              <button className="form-button">Add Item</button>
            </form>
          </div>
        </Auth>
        <div>
          <ul>
            {todoList.map(item => (
              <li
                className={`complete-${item.complete.toString()}`}
                key={item.key}
              >
                <span onClick={() => toggleComplete(item.key)}>
                  {item.text}
                </span>
                <button onClick={() => toggleDetails(item.key)}>more Details</button>
                <Auth capability="delete">
                  <button onClick={() => deleteItem(item.key)}>
                            Delete
                  </button>
                </Auth>
              </li>
            ))}
          </ul>
        </div>
        <Auth capability='read'>
          <div>
            <h2>
            There are [ {todoList.filter( item => !item.complete).length}
            ] Item to complete
            </h2>
            {/* <If condition={!settingContext}> */}
            <Then>
              <button className="display-button" name="hideCompleteButton" onClick={toggleHideComleted}>
              Display Completed
              </button>
            </Then>
            <Else condition={settingContext}>
              <button className="display-button" name="hideCompleteButton" onClick={toggleHideComleted}>
               Display All
              </button>
            </Else>
            {/* </If> */}
          </div>
        </Auth>
      </section>
      {/* i need to show the details by condition because that i use if  */}
      <When condition={showDetails}>
        <Modal title="ToDo-Item" close={toggleDetails}>
          <div className="item">{details.text}</div>
          <div className="todo-details">
            <header>
              <span>Assigned To: {details.assignee}</span>
              <span>Date: {details.Time}</span>
            </header>
          </div>
        </Modal>
      </When>
    </>
  );
};

export default ToDo;
