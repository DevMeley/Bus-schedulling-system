const myForm = document.getElementById("myForm")
const myEmail = document.getElementById("myEmail").value.trim()
const myPassword = document.getElementById("myPassword").value.trim()
const confirmMyPassword = document.getElementById("confirmMyPassword").value.trim()
const signUp = document.getElementById("signUp")


myForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (myEmail === "") {
        showError(myEmail, 'Email is required')
    }
    else if (!validateEmail(myEmail)) {
        showError(myEmail, "Invalid Email")
    }
    else{
        removeError(myEmail)
    }

    
    if (myPassword === "") {
        showError(myPassword, "Password is required")
    }
    else if (myPassword.length > 6) {
        showError(myPassword, "Password is too short")
    }
    else{
        removeError(myPassword)
    }

    if (confirmMyPassword === "") {
        showError(confirmMyPassword, "Confirm password")
    }
    else if (confirmMyPassword !== myForm) {
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

const validateEmail = (myEmail) =>{
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(myEmail).toLocaleLowerCase())
}


