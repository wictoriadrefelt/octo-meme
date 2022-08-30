

const inputForm = document.getElementById('userNameInput')






const getValue = () => {
// get user name from input field 
inputForm.addEventListener('submit', (e) => {
    // prevents the default behaviour when submitting a form
    e.preventDefault(); 

    // get message text from input
    const userName = e.target.value; 
    
    console.log(userName)
   /*  //emiting a message to the server
    socket.emit('chatMessage', userName)

    //clear input after 
    e.target.elements.msg.value = ''; 
    e.target.elements.msg.focus(); */

})
}

inputForm.addEventListener('click', () => {
    console.log('hej')
    getValue(); 
})