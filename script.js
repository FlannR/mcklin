let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

document.getElementById('read-more-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    const moreText = document.getElementById('more-text');
    const btn = document.getElementById('read-more-btn');

    if (moreText.style.display === 'none') {
        moreText.style.display = 'inline'; 
        btn.textContent = 'Read Less';
    } else {
        moreText.style.display = 'none';
        btn.textContent = 'Read More';
    }
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    let formData = new FormData(this); // Get form data
    let formObject = {};

    // Convert formData into an object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Send the form data to the backend using fetch
    fetch('http://localhost:3000/send-message', {  // Change to your live server URL when ready
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject)
    })
    .then(response => {
        if (response.ok) {
            alert("Message sent successfully!");  // Success message
        } else {
            alert("There was an error sending the message.");  // Error message
        }
    })
    .catch(error => {
        alert("Network error: " + error.message);  // Network error message
    });
});

document.querySelector('.faq-link').addEventListener('click', function (event) {
    event.preventDefault();
    const faqSection = document.getElementById('faq');
    faqSection.classList.toggle('hidden'); // Toggle FAQ visibility
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const toggle = this.querySelector('.faq-toggle');

        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            toggle.textContent = '+'; // Show '+' when collapsed
        } else {
            answer.style.display = 'block';
            toggle.textContent = '-'; // Show '-' when expanded
        }
    });
});

function openModal() {
    document.getElementById('digit-box-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('digit-box-modal').style.display = 'none';
}


function downloadAPK() {
    // Show alert instead of displaying the message in HTML
    alert("Sorry, try again later.");
}

/*function downloadAPK() { 
    const apkPath = './digit_box/digit_box.apk'; 
    const link = document.createElement('a'); // Create a temporary anchor element
    link.href = apkPath;
    link.download = 'digit_box.apk'; 
    link.click(); // Trigger the download
}*/
// Open the modal
function opencsModal() {
    document.getElementById('comingSoonModal').style.display = "block";
}

// Close the modal
function closecsModal() {
    document.getElementById('comingSoonModal').style.display = "none";
}

// Close the modal if the user clicks outside the modal content
window.onclick = function(event) {
    if (event.target == document.getElementById('comingSoonModal')) {
        closeModal();
    }
}

