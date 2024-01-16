const saveBtn = document.querySelector('#save-post-btn');

const saveHandler = async(event)=>{
    event.preventDefault();

    
    const title = document.querySelector('#post-write-title').value;
    const body = document.querySelector('#post-write-body').value;
    // const user_id = ~~saveBtn.dataset.user_id
    const user_id = ~~document.querySelector('#hidden-userId').value

    if (title&&body){
        const response = await fetch('/api/post/', {
                method: 'POST',
                body: JSON.stringify({ title, body, user_id }),
                headers: { 'Content-Type': 'application/json' },
            });
        if (response.ok){
            saveBtn.removeEventListener('click', saveHandler);
            document.location.replace(`../u/${saveBtn.dataset.username}`);
        } else {
            alert(response.statusText);
        };
    } else {
        alert('Post must have a title and a body.')
    };
};

saveBtn.addEventListener('click', saveHandler);