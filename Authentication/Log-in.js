const myForm = document.getElementById("myForm")
const signUp = document.getElementById("signUp")



myForm.addEventListener('submit', event =>{

    event.preventDefault()

    const myEmail = document.getElementById("myEmail")
    const myPassword = document.getElementById("myPassword")

    validateForm()
    
})

const validateForm = () =>{

    const myEmailElement =  document.getElementById("myEmail").value
    const myPasswordElement = document.getElementById("myPassword").value


    if (myEmailElement === '') {
        showError(myEmail, "Email is required")
    }
    else if (!validateEmail(myEmailElement)) {
        showError(myEmail, "Invalid Email")
    }
    else{
        removeError(myEmail)
    }

    if (myPasswordElement === '') {
        showError(myPassword, 'Password is required')
    }
    else{
        removeError(myPassword)
    }
    
}

const showError = (element, message) =>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = message
    inputControl.classList.add("error")
    inputControl.classList.remove("success")
}

const removeError = (element) =>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = ''
    inputControl.classList.add("success")
    inputControl.classList.remove("error")
}

const validateEmail = (myEmailElement) =>{
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(myEmailElement)
}