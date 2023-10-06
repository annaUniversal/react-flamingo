import * as React from 'react';

const list = [
  {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
  },
  {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
  },
];

const Header = ({title}) => { //componets are capitalized

  return(
    <h1>{title}</h1>
  
  )
}

const Link = ({url, title}) => { //componets are capitalized

  return(
    <a href={url}>{title}</a>
  
  )
}

function App() {
  return (
    <div>
      <Header title = "New Story"/>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />

      <hr/>
      {/* render the list */}
      <ul>
        {list.map(function (item) {
          return ( 
            <li key = {item.objectID}>
              <span> 
                <Link title={item.title}  url={item.url} />
              </span>
              <span> {item.author} </span>
              <span>{item.num_comments} </span>
              <span>{item.points}</span>
            </li>
          )  
        })}
      </ul>
            
    </div>
  );
}
export default App;