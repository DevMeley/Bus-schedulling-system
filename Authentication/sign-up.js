const myForm = document.getElementById("myForm")
const signUp = document.getElementById("signUp")


myForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const myEmail = document.getElementById("myEmail")
    const myPassword = document.getElementById("myPassword")
    const confirmMyPassword = document.getElementById("confirmMyPassword")

    if (myEmail.value === "") {
        showError(myEmail, 'Email is required')
    }
    else if (!validateEmail(myEmail.value)) {
        showError(myEmail, "Invalid Email")
    }
    else{
        removeError(myEmail)
    }

    
    if (myPassword.value === "") {
        showError(myPassword, "Password is required")
    }
    else if (myPassword.value.length < 6) {
        showError(myPassword, "Password is too short")
    }
    else{
        removeError(myPassword)
    }

    if (confirmMyPassword.value === "") {
        showError(confirmMyPassword, "Confirm password")
    }
    else if (confirmMyPassword.value !== myPassword.value) {
        showError(confirmMyPassword, "Password doesn't match")
    }
    else{
        removeError(confirmMyPassword)
    }

})

const showError = (element, message) =>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.Error')

    errorDisplay.innerText = message
    inputControl.classList.add('error')
    inputControl.classList.remove('success')

}
const removeError = (element) => {
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.Error')

    errorDisplay.innerText = ''
    inputControl.classList.add('success')
    inputControl.classList.remove('error')
}

const validateEmail = (myEmailElement) =>{
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(myEmailElement).toLocaleLowerCase())
}


