// Get the modal
const suButton = document.getElementById("signup");
suButton.style.color="red"
// Get the button that opens the modal
// const suModal = document.getElementById("sign-up-form");

// Get the <span> element that closes the modal
// const closeThis = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
suButton.onclick = (e) => {
    e.preventDefault();
    console.log("Hey I'm running")

    //suModal.style.display = "block";
    console.log("Hey I'm done running")
}

// // When the user clicks on <span> (x), close the modal
// closeThis.onclick = function() {
//     suModal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == suModal) {
//         suModal.style.display = "none";
//     }
// }