export function handle(state, action) {
  if (action.input.function === "createPost") {
    var posts = state.posts; // Fetch all the posts

    var uuid = generateUUID(); // Created a unique ID for the post ID

    var post = {
      title: action.input.post.title,
      body: action.input.post.body,
      author: action.caller,
      id: uuid,
    };

    posts[uuid] = post; // Uses the id for the index and sets its data

    state.posts = posts; // Update the state
  }

  if (action.input.function === "modifyPost") {
    var posts = state.posts; // Fetch all the posts

    var selectedPost = posts[action.input.post.id]; // Find which post was selected

    if (selectedPost.author != action.caller)
      throw new ContractError("Not post creator"); // If the person trying to update the data isnt the author return an error

    posts[selectedPost.id].title = action.input.post.title;
    posts[selectedPost.id].body = action.input.post.body;

    state.posts = posts; // Update the state
  }

  if (action.input.function === "deletePost") {
    var posts = state.posts; // Fetch all the posts

    var selectedPost = posts[action.input.post.id]; // Find which post was selected

    if (selectedPost.author != action.caller)
      throw new ContractError("Not post creator"); // If the person trying to update the data isnt the author return an error

    delete posts[selectedPost.id]; // Remove the entry

    state.posts = posts; // Update the state
  }

  return {
    state,
  };
}

function generateUUID() {
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
