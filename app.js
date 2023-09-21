// Refactor: Figure out how to properly handle error responses from GET Request

const giphyKey = "MoU6paODcuSi0uew5Jb9WCaR1r58EXp3";

// Take user input, request a gif, add to DOM
$("#searchForm").on("submit", async function (e) {
  e.preventDefault();

  const gifURL = await searchForGif(giphyKey, e.target[0].value);

  if (typeof gifURL !== "undefined") {
    addGifToDOM(gifURL);
  }

  $("#searchInput").val("");
});

// remove all images from the DOM
$("#rmvImgs").on("click", () => {
  $("#gifDisplay").empty();
});

// API Get request from giphy
async function searchForGif(api_key, q) {
  const gif = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { api_key, q },
  });
  let randIdx = Math.round(Math.random() * gif.data.data.length);

  // checks if anything is returned
  if (gif.data.data.length) {
    return gif.data.data[randIdx].images.original.url;
  } else {
    alert("No results, please try again")
    return undefined
  }
}

// appends the html with image to container
function addGifToDOM(gifURL) {
  const appendHTML = createHTMLString(gifURL);

  $("#gifDisplay").append(appendHTML);
}

// create the HTML string to be added to the DOM
function createHTMLString(gifURL) {
  return `<div class='col-md-4 col-12 mb-4 h-75'>
            <img src=${gifURL} class='img-fluid'/>
          </div>`;
}
