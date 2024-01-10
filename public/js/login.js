// const loginHandler = async (event)=>{
//     event.preventDefault()

//     const email = document.querySelector('#login-identifier').value.trim();
//     const password = document.querySelector('#login-password').value.trim();

//     if(email&&password){
//         const response = await fetch('/api/user/login', {
//             method: 'POST',
//             body: JSON.stringify({ email, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });
//         if (response.ok){
//             document.location.replace('/');
//         } else {
//             alert(response.statusText);
//         };
//     };
    
// };

// document.querySelector('#login-submit').addEventListener('click', loginHandler);
const submit = document.querySelector('#login-submit');
const loginHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();
  
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to login');
      }
  };

  submit.addEventListener('click', loginHandler);
