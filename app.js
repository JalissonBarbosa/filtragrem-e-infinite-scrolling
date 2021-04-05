const postsContainer = document.querySelector('#posts-container');
const filterInput = document.querySelector('#filter');
const containerLoader = document.querySelector('.loader');

let page = 1;

const getPost = async () => {
  const response = await 
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
  return response.json();
}

const addPostIntoDom = async ()  => {
  const posts = await getPost();
  const postsTemplate = 
  posts.map(({id, title, body}) =>
       `
      <div class="post">
      <div class="number">${id}</div>
      <div class="post-info">
        <h2 class="post-title">${title}</h2>
        <p class="post-body">${body}</p>
      </div>
      </div>
      `
      ).join('')
      postsContainer.innerHTML += postsTemplate;
}


const getNextsPosts = () =>{
  setTimeout(() =>{
    page++;
    addPostIntoDom();
  },300)
}

const removeLoader = () =>{
  setTimeout( () =>{
    containerLoader.classList.remove('show');
    getNextsPosts();
  },1000)
}

const showLoader = () => {
  containerLoader.classList.add('show');
  removeLoader();
}

window.addEventListener('scroll', () => {
  
  const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
  const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10;
  if(isPageBottomAlmostReached){
    showLoader();
    
  }
})

filterInput.addEventListener('input', event => {
  const inputValue = event.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');
  
  posts.forEach(post => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase();
    const postBody = post.querySelector('.post-body').textContent.toLowerCase();
    const inputContainsValue = postTitle.includes(inputValue) 
    || postBody.includes(inputValue);
    
    if(inputContainsValue){
      post.style.display = 'flex';
      return;
    }
    post.style.display = 'none';
  })
})

addPostIntoDom();