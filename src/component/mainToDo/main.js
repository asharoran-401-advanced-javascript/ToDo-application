/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';
import React , {useEffect , useState} from 'react';

const Main = () => {
  const [todoList , setTodoList] = useState([]);
  const [item , setItem] = useState({});
  const [details , setDetails] = useState({});
  const [showDetails , setShowDetail] = useState(false);

  useEffect(() => {
    console.log('new item is added');
    if(todoList.length >= 1){ document.title = `${item} is added`;}
  });

  const _addItem = (e) =>{
    e.preventDefault();
    // e.target.reset();
    setTodoList([...todoList] , item );

  };
  const _changeItem = (e) => {
    setItem({...item , [e.target.name] : e.target.value});
  };

  const toggleDetail = () =>{
    let showDetailState = !showDetails;
    setDetails(showDetailState);

  };

  return(
    <>
      <form onSubmit={_addItem}>
        <label>
          <input type="text" name="text" placeholder="to do text" onChange={_changeItem}/>
        </label>

        <label>
          <span> Assigned to:</span>
          <input type="text" name="assignee" placeholder="Assigned to" onChange={_changeItem}/>
        </label>

        <label>
            Status {/* completed or incomplete */}
        </label>
        <label>
          <span> Difficulty</span>
          <input type="range" name="difficulty" min="1" max="5" defaultValue="3" onChange={_changeItem} />
        </label>

        <label>
          <span>Because</span>
          <input type="text" name="Because" placeholder="title of item" onChange={_changeItem}/>
        </label>

        <button onClick={_addItem}>Add Item</button>
      </form>
      <ul>
        {todoList.map( item =>
          <li key ="item" onChange={toggleDetail}>{item}</li>,
        )}
      </ul>

    </>
  );
};

export default Main;