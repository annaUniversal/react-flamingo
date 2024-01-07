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

const storiesReducer = (state, action) => {
  switch (action.type){
    case 'SET_STORIES':
      return action.payload;
    case 'REMOVE_STORY':
      return state.filter(
        story => action.payload.objectID !== story.objectID
      );
    default:
      throw new Error();
  }
}

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

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
    );

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useState(() => {
      localStorage.setItem(key, value);
    }, [value]);

    return [value, setValue];
  };

  //states
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then((result) => {
        //setStories(result.data.stories);
        dispatchStories({
          type: 'SET_STORIES',
          payload: result.data.stories,
        })
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveStories = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    //setStories(newStories);
    dispatchStories ({
      type: 'REMOVE_STORY',
      payload: item,
    })

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
      

      {isError && <p>Something went wrong ...</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list={searchedStories}
          // title="React Ecosystem"
          onRemoveItem={handleRemoveStories}
        />
      )}

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

const List = ({ list, onRemoveItem }) =>
  list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));

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
