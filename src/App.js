import * as React from "react";

let List = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {props.list.map(function (item) {
          return <Item item={item} />;
        })}
      </ul>
    </div>
  );
};

const Item = (props) => {
  // or use const Item = ({item}) =>
  //const item = props.item //if we don't want to use .
  //const {item} = props - another way

  return (
    <li key={props.item.objectID}>
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span> {props.item.author} </span>
      <span>{props.item.num_comments} </span>
      <span>{props.item.points}</span>
    </li>
  );
};

function Search() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleChange = (event) => {

    console.log(searchTerm);
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        onChange={handleChange}
      />

      <p>
    Search for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
}

function App() {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const javaScriptLibraries = [
    {
      title: "jQuery",
      url: "https://jquery.org/",
      author: "John Resig",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Angular",
      url: "https://angular.org/",
      author: "Google",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  return (
    <div>
      <h1>My Stories</h1>
      <Search />
      <hr />
      <List list={stories} title="React Ecosystem" />
      <List list = {javaScriptLibraries} title = "JS Libraries" />

    </div>
  );
}
export default App;
