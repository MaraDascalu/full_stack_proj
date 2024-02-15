const url = "https://jsonplaceholder.typicode.com/posts";

// ? Using Promise based
const fetchData = () => {
  fetch(url)
    .then((response) => {
      return response.json(); // ! this returns a Promise
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
};

//fetchData();

// ? Using async await
const fetchData2 = async () => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

fetchData2().then((res) => {
  console.log(res);
});
