/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// // eslint-disable-next-line strict
// 'use strict';

import React , {useEffect , useState} from 'react';
// import uuid from 'uuid/v4';
import { When } from '../if/if.js';
import Modal from '../model/model.js';
import '../mainToDo/main.scss';
import useForm from '../hooks/useform.js';
import useFetch from '../hooks/usefetch.js';

const ToDo = props => {
//   //----------------------------------Hooks ----------------------------------------//
  const [todoList , setTodoList] = useState([]); // arr
  const [item , setItem] = useState({}); // i pass is as a object beause it's easy to use object proparty
  const [details , setDetails] = useState({}); //because each item have details
  const [showDetails , setShowDetails] = useState(false); // as initial value hide the details (I use this state in the toggle to show/hide)
  const [handleSubmit  , handleChange ,values ] = useForm(addItem); // that mean we use form to add item to our todo list
  const [setRequest , response] = useFetch();

  const url = 'https://api-js401.herokuapp.com/api/v1/todo';

  useEffect(() => {
    getAll();
  }, []);

  // set todo list from data if data exists else get all
  useEffect(() => {
    if (response.count >= 0) {
      setTodoList(response.results);
    } else {
      getAll();
    }
  }, [response]);

  useEffect(() => { // similar to componentDidMount and componentDidUpadate
    let complete = todoList.filter(item => !item.complete).length; // true
    let incomplete = todoList.filter(item => item.complete).length; // false
    document.title = `ToDo:${complete} Done:${incomplete}`;
  });

  // const handleInputChange = e => { // make a copy of each item and add a new property with value to it
  //   setItem({ ...item, [e.target.name]: e.target.value });
  // };

  // const addItem = e => {
  //   e.preventDefault();
  //   // setTodoList([ ...todoList , item]); //---- so here I have problem that how can browser know that is a new item so I need to make a uniqe key to each item ---//
  //   const defaults = { key: uuid(), complete: false }; // make each id as a uniqe
  //   const newItem = Object.assign({}, item, defaults); // to copy propreties from one or more source of objects
  //   setTodoList([...todoList, newItem]); // to copy properity from one or more resoure of object
  //   setItem({});
  //   e.target.reset();
  //   // console.log(todoList);
  // };
  const getAll = () => {
    const request = {
      url: url,
      options: {
        method: 'GET',
      },
    };
    setRequest(request);
  };

  function addItem(data) {
    console.log('data():',data);
    const request = {
      url: url,
      options: {
        method: 'POST',
        body: JSON.stringify(data),
      },
    };
    setRequest(request);
  }

  const deleteItem = id => {
    // console.log('item id():' , item._id);
    console.log(id);
    const request = {
      url: `${url}/${id}`,
      options: {
        method: 'DELETE',
      },
    };
    setRequest(request);
    setItem({});
  };

  const saveItem = updatedItem => {
    const request = {
      url: `${url}/${updatedItem._id}`,
      options: {
        method: 'PUT',
        body: JSON.stringify(updatedItem),
      },
    };
    setRequest(request);
  };

  const toggleComplete = key => {
    let itemCompleted = todoList.filter(item => item.key === key)[0] ;
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

  return (
    <>
      <section className="todo">
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <span>ToDo Item :</span>
              <input name="text" placeholder="Add Item" onChange={handleChange}/>
            </label>
            <label>
              <span>Difficulty :</span>
              <input type="range" min="1" max="5" name="difficulty" defaultValue="3" className="difficulty" onChange={handleChange} />
            </label>
            <label>
              <span>Assigned To :</span>
              <input  type="text" name="assignee" placeholder="Assigned To" onChange={handleChange} />
            </label>
            <label>
              <span>Date :</span>
              <input type="date" name="Time" onChange={handleChange} />
            </label>
            <button className="form-button">Add Item</button>
          </form>
        </div>

        <div>
          <ul>
            { Object.keys(values).map((id , idx) => (
              <li
              // className={`complete-${key.complete.toString()}`}
                key={idx}
              >
                <span onClick={() => toggleComplete(id)}>
                  {values.text}
                </span>
                <button onClick={() => toggleDetails(id)}>
                          Details
                </button>
                <button onClick={() => deleteItem(id)}>
                          Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* i need to show the details by condition because that i use if  */}
      <When condition={showDetails}>
        <Modal title="ToDo-Item" close={toggleDetails}>
          <div className="item">{values.text}</div>
          <div className="todo-details">
            <header>
              <span>Assigned To: {values.assignee}</span>
              <span>Date: {values.Time}</span>
            </header>
          </div>
        </Modal>
      </When>
    </>
  );
};

export default ToDo;

