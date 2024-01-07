import * as React from "react";

const initialStories = [
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

function App() {
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

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useState(() => {
      localStorage.setItem(key, value);
    }, [value]);

    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStories = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Stories</h1>
      {/*  <Search onSearch={handleSearch} searchTerm={searchTerm} /> */}
      <InputWithLablel
        id="search"
        /*lable="Search"*/
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <hr />
        {/* children */}
        <strong> Search: </strong>
      </InputWithLablel>
      <List
        list={searchedStories}
        title="React Ecosystem"
        onRemoveItem={handleRemoveStories}
        />
        <p>Hi</p>
      <List list={javaScriptLibraries} title="JS Libraries" />
    </div>
  );
}

const InputWithLablel = ({
  id,
  /*label,*/
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children} </label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

function Search(props) {
  //const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    // setSearchTerm(event.target.value);
    props.onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <p>
        Search for <strong>{props.searchTerm}</strong>
      </p>
    </div>
  );
}

/*let List = (props) => {
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
};*/

const List = ({ list, onRemoveItem }) =>
  list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));

/*const Item = (props) => {
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
};*/

const Item = ({ item, onRemoveItem }) => (
  <div>
    {console.log("Hi")}
    {console.log(item.url)}

    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span> {item.author} </span>
    <span>{item.num_comments} </span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        {" "}
        Remove
      </button>
    </span>
  </div>
);

export default App;
