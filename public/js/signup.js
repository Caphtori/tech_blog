const submit = document.querySelector('#signup-submit');

const signupHandler= async(event)=>{
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (username&&email&&password){
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok){
            await fetch('/api/user/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
                headers: { 'Content-Type': 'application/json' },
              });
            document.location.replace('/');
        } else {
            alert(response.statusText);
        };
    };
    
};

submit.addEventListener('click', signupHandler);