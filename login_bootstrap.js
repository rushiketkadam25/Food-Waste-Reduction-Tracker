document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('accessForm');
    const message = document.getElementById('message');
    const toggleLink = document.getElementById('toggleLink');
    const submitButton = document.getElementById('submitButton');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const nameField = document.getElementById('name-field');
    const toggleText = document.getElementById('toggleText');
    const fullNameElement = document.getElementById('fullName');
    const usernameElement = document.getElementById('username');
    const passwordElement = document.getElementById('password');

    let isLoginMode = true; 
    // const REDIRECT_PAGE = 'index.html'; 

    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};

    
    function toggleFormMode(e) {
        e.preventDefault();
        
        isLoginMode = !isLoginMode;
        message.style.display = 'none'; 
        
    
        fullNameElement.value = '';
        usernameElement.value = '';
        passwordElement.value = '';

        if (isLoginMode) {
            formTitle.textContent = 'Login';
        
            formSubtitle.textContent = "Use your registered username and password to log in."; 
            submitButton.textContent = 'Log In';
            toggleText.textContent = "Don't have an account?";
            toggleLink.textContent = "Create Your Account";
            nameField.style.display = 'none'; 
            fullNameElement.removeAttribute('required');
        } else {
            formTitle.textContent = '📝 Create New Account';
            formSubtitle.textContent = "Welcome!";
            submitButton.textContent = 'Sign Up';
            toggleText.textContent = "Already have an account?";
            toggleLink.textContent = "Log In";
            nameField.style.display = 'block'; 
            fullNameElement.setAttribute('required', 'required');
        }
    }


    toggleLink.addEventListener('click', toggleFormMode);



    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const usernameInput = usernameElement.value.trim();
        const passwordInput = passwordElement.value.trim(); 
        const fullNameInput = fullNameElement.value.trim();

        message.style.display = 'block';
        message.classList.remove('text-danger', 'text-success');

        if (isLoginMode) {

            
            const user = registeredUsers[usernameInput];

            if (user && user.password === passwordInput) {
            
                localStorage.setItem('isLoggedIn', 'true');
                message.textContent = `Welcome back, ${user.name || usernameInput}! `;
                message.classList.add('text-success', 'fw-bold'); 
                
            
                passwordElement.value = '';
                
        
                
            } else {
        
                message.textContent = 'Invalid username or password.';
                message.classList.add('text-danger', 'fw-bold'); 
                passwordElement.value = ''; 
            }
        } else {
            
            if (!usernameInput || !passwordInput) {
                message.textContent = 'Please enter a Username and Password.';
                message.classList.add('text-danger', 'fw-bold');
                return;
            }

            
            if (registeredUsers.hasOwnProperty(usernameInput)) {
                message.textContent = 'Error: That username is already taken. Try logging in.';
                message.classList.add('text-danger', 'fw-bold');
                passwordElement.value = ''; 
            } else {
                
                
            
                registeredUsers[usernameInput] = {
                    name: fullNameInput,
                    password: passwordInput 
                };
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            
                localStorage.setItem('isLoggedIn', 'true');
                
                const welcomeName = fullNameInput || usernameInput; 
                
                message.textContent = `Account for ${welcomeName} created! You are now logged in.`;
                message.classList.add('text-success', 'fw-bold');
                
            
                fullNameElement.value = '';
                usernameElement.value = '';
                passwordElement.value = '';

                
            }
        }
    });
});