
// const postId = ~~document.querySelector('#hiddenValue').value;
// const deleteBtn = document.querySelector(`#delete-post-${postId}`);
const deleteBtns = document.querySelectorAll('.dlt-btn')
const postIds = [...document.querySelectorAll('.hidden-postId')].map((id)=>id.value)
console.log(postIds)
// const ids= postIds.map((id)=>~~id.value);
// const deleteHandler = async (event, index)=>{
//     event.preventDefault();
//     // const postId = ~~event.dataset.post;
//     const postId = postIds[index];
//     await fetch(`/api/post/${postId}`, {
//         method: 'DELETE',
//     });

//     document.location.replace(`/`);
// };

// deleteBtns.forEach((el, i)=>{
//     el.addEventListener('click', deleteHandler(i));
// });
// deleteBtn.addEventListener('click', deleteHandler);
// for (let i=0; i<deleteBtns.length; i++){
//     deleteBtns[i].addEventListener('click', deleteHandler(i));
// };

for (let i=0; i<deleteBtns.length; i++){
    deleteBtns[i].addEventListener('click', async function(event){
    event.preventDefault();
    const postId = postIds[i];
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
    });

    document.location.replace(`/`);
    });
};
    