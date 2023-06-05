const postsList=document.querySelector('.posts-list');
const addPost=document.querySelector('.add-post-form');
const titleValue =document.getElementById('title-value');
const bodyValue =document.getElementById('body-value');
// const deletebutton=document.querySelector('#delete-post');
// let btnSubmit = document.querySelector('.btn')
let output= '';
const renderPosts = (posts) =>{
    posts.forEach(post => {
        // console.log(post);
        output += `
        <div class="card mt-4 col-md-6 bg-light">
            <div class="card-body" data-id=${post.id}>
            <h5 class="card-title">${post.title}</h5
            <p class="card-text">${post.body}</p>
            <a href="#" class="card-link" id="edit-post">Edit</a>
            <a href="#" class="card-link" id="delete-post">Delete</a>
            </div>
        </div>
        `;
    });
    postsList.innerHTML = output;
}
const url = 'https://jsonplaceholder.typicode.com/posts';
// get read the post
// methord: get
fetch(url)
.then(res => res.json())
.then(data => renderPosts(data))
postsList.addEventListener('click', (e) =>{
   e.preventDefault();
   let delButtonPressed =  e.target.id == 'delete-post';
   let editButtonPressed = e.target.id == 'edit-post';
   let id=e.target.parentElement.dataset.id;
//    Delete =remove the existing post
//  methord=delete
if(delButtonPressed){
 fetch(`${url}/${id}`,{
    method: 'DELETE',
 })
 
  .then(res => res.json())
  .then(() => location.reload())
}
if(editButtonPressed){
    const parent =e.target.parentElement;
    let titleContent = parent.querySelector('.card-title').textContent;
    let bodyContent = parent.querySelector('.card-text').textContent;
//  console.log(titleContent,bodyContent);
titleValue.value = titleContent;
bodyValue.value = bodyContent;
}
// 
});
//update :-update the existing post
//methord fetch
// btnSubmit.addEventListener('click',()=>{
//     console.log("pppp");
// })




// create-insert new post
// methord :post 
addPost.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch(url,{
        method:'POST',
        headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: titleValue.value,
        body:bodyValue.value
    })
})
.then(res => res.json())
.then(data =>{
    const dataArr=[];
    dataArr.push(data);
    renderPosts(dataArr);
})
})