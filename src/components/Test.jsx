import React, { useState } from "react";

const Search = () => {
  const [displayWords, setDisplayWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [wordCount, setWordCount] = useState(0);

  const SEARCH_RESULTS = [
    { id: "910eb5e3-906d-432f-afeb-7820d821cca7", text: "Lumos Identity" },
    { id: "13baeb9c-f4f6-4bee-be88-e3f68155e8f2", text: "Lucasfilm" },
    { id: "401955a8-8703-43f1-bb38-84dc09e43277", text: "Lufthansa" },
    { id: "a5080f53-a37e-4137-9137-97c7cc18a4fa", text: "Linkedin" },
    { id: "4b7b24bb-698d-4269-a5b2-f1112955105b", text: "Lyft" },
    { id: "4129ed83-7047-438a-b5e7-2d7d01afe860", text: "Lumos Labs" }
  ];

  const [customSearchOptions, setCustomSearchOptions] = useState(
    SEARCH_RESULTS
  );

  //Function to handle what is being typed in searchbar
  const handleOnchange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    if (wordCount === 0) {
      if (event.target.value && event.target.value.length > 0) {
        const filterResult = SEARCH_RESULTS.filter((element) =>
          element.text
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase())
        );
        const filterWord = filterResult.map((element) => element.text);
        console.log(filterWord, "here");
        setDisplayWords(filterWord);
      }
    }
    if (wordCount > 0) {
      if (event.target.value && event.target.value.length > 0) {
        const filterResult = customSearchOptions.filter((element) =>
          element.text
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase())
        );
        const filterWord = filterResult.map((element) => element.text);
        console.log(filterWord, "here");
        setDisplayWords(filterWord);
      }
    }
  };

  //Function handling user clicking words that display
  const handleOnclick = (event) => {
    event.preventDefault();
    const addedWords = [...selectedWords];
    const updatedSearchOptions = [...customSearchOptions];
    console.log(event.target.value, "the word that was clicked");
    const wordsToFilter = [...displayWords];
    wordsToFilter.forEach((word) => {
      if (word.match(event.target.value)) {
        addedWords.push(word);
        updatedSearchOptions.forEach((element) => {
          if (element.text.match(word)) {
            console.log(element, "before deleted");
            delete element.text;
            delete element.id;
            console.log(updatedSearchOptions, "the opbject");
            setCustomSearchOptions(updatedSearchOptions);
            setWordCount(wordCount + 1);
          }
        });
      }
    });
    setSelectedWords(addedWords);
    console.log(selectedWords, "the words");
  };

  //Deleting selected words
  const handleDelete = () => {
    console.log("yup");
  };

  return (
    <div>
      <div>
        {" "}
        <>
          {selectedWords?.length ? (
            selectedWords.map((word, index) => {
              return (
                <button onClick={handleDelete} key={index}>
                  {word}
                </button>
              );
            })
          ) : (
            <></>
          )}
        </>{" "}
      </div>
      <input
        type="search"
        id="searchBar"
        required
        placeholder="Search"
        onChange={handleOnchange}
      ></input>
      <>
        {displayWords?.length ? (
          displayWords.map((word, index) => {
            return (
              <option onClick={handleOnclick} key={index}>
                {word}
              </option>
            );
          })
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default Search;
