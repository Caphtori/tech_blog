const saveBtn = document.querySelector('#comment-submit');

const saveHandler = async(event)=>{
    event.preventDefault();
    

    
    const body = document.querySelector('#comment-input').value;
    const user_id = document.querySelector('#hidden-userId').value;
    const post_id = document.querySelector('#hidden-postId').value;

    if (body){
        
        const response = await fetch('/api/comment/', {
                method: 'POST',
                body: JSON.stringify({ body, user_id, post_id }),
                headers: { 'Content-Type': 'application/json' },
            });
        if (response.ok){
            saveBtn.removeEventListener('click', saveHandler);
            document.location.reload();
        } else {
            alert(response.statusText);
        };
    } else {
        alert('Comment must have a body.')
    };
};

saveBtn.addEventListener('click', saveHandler);