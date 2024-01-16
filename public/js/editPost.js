const saveBtn = document.querySelector('#save-post-btn');
const postId = ~~document.querySelector('#hiddenValue').value;


const editHandler = async (event)=>{
    event.preventDefault();
    
    const title = document.querySelector('#post-write-title').value;
    const body = document.querySelector('#post-write-body').value;
    if (title&&body){
        await fetch(`/api/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, body }),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        document.location.replace(`/p/${postId}`);
    }else{
        alert('Post must have a title and a body.')
    }
};

saveBtn.addEventListener('click', editHandler);
    