const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const cardNameInputField = document.querySelector('#cardholdername');
const cardNumberInputField = document.querySelector('#cardnumber');
const cardExpiryNumberInputField = document.querySelector('#expiry-date');
const cardCvvNumberInputField = document.querySelector('#cvv');

window.addEventListener('load', () => {
    askname();
});

const askname = () => {
    const question = new SpeechSynthesisUtterance('What is your name?');
    speechSynthesis.speak(question);
    setTimeout(() => {
        recognition.start();
    }, 2000);
};

const askCardNumber = () => {
    const confirmMessage = new SpeechSynthesisUtterance('What is your card number?');
    speechSynthesis.speak(confirmMessage);
    setTimeout(() => {
        recognition.start();
    }, 4000);
};

const askExpiryDate = () => {
    const confirmMessage = new SpeechSynthesisUtterance('What is your expiry date?');
    speechSynthesis.speak(confirmMessage);
    setTimeout(() => {
        recognition.start();
    }, 1500);
};

const askCvvNumber = () => {
    const confirmMessage = new SpeechSynthesisUtterance('What is your CVV?');
    speechSynthesis.speak(confirmMessage);
    setTimeout(() => {
        recognition.start();
    }, 1500);
};

recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript;

    if (cardNameInputField.value === '') {
        updateInputField(cardNameInputField, speechResult);
        recognition.stop();
        askCardNumber();
    } else if (cardNumberInputField.value === '') {
        updateInputField(cardNumberInputField, speechResult);
        recognition.stop();
        askExpiryDate();
    } else if (cardExpiryNumberInputField.value === '') {
        updateInputField(cardExpiryNumberInputField, speechResult);
        recognition.stop();
        askCvvNumber();
    } else if (cardCvvNumberInputField.value === '') {
        updateInputField(cardCvvNumberInputField, speechResult);
        recognition.stop();
        window.location.href = './thankyou.html';

        // Check if all fields are filled before generating the ticket
        if (cardNameInputField.value !== '' && cardNumberInputField.value !== '' &&
            cardExpiryNumberInputField.value !== '' && cardCvvNumberInputField.value !== '') {
            generateTicket();
        }
    }
};


const updateInputField = (inputField, value) => {
    inputField.value = value;
};





function generateTicket() {
    const name = document.getElementById("name").value;
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const travelDate = document.getElementById("travel-date").value;
    const travelClass = document.getElementById("class").value;
    const traveltrain = document.getElementById("train-name").value;



    if (name === "" || source === "" || destination === "" || travelDate === "" || travelClass === "") {
        alert("Please fill in all the required fields.");
        return;
    }
    // Generate random seat number
    const seatNumber = Math.floor(Math.random() * 100) + 1;
    let seatType;
    if (seatNumber <= 30) {
        seatType = "L";
    } else if (seatNumber <= 70) {
        seatType = "M";
    } else {
        seatType = "U";
    }
    const seat = seatNumber + seatType;




    const ticket = `
 <style>
    /* CSS styles for the ticket */
  body{
    background-image: url("train_reservation.jpg");
  }
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
      margin-bottom: 10px;
    }
        strong {
      font-weight: bold;
    }
  </style>

  <div class="ticket">
        <h2>Ticket Details</h2>
        <p><strong>Ticket Id :</strong> ${generateTicketId()}</p>
        <p><strong>Train Number:</strong> ${generateTrainNumber()}</p>
        <p><strong>Name:</strong> ${name}</p>
            <p><strong>From:</strong> ${source}</p>
        <p><strong>To:</strong> ${destination}</p>
        <p><strong>Travel Date:</strong> ${travelDate}</p>
        <p><strong>Class:</strong> ${travelClass}</p>
        <p><strong>Train :</strong> ${traveltrain}</p>
        <p><strong>Seat Number:</strong> ${seat}</p>


  </div>
`;



    const ticketDiv = document.createElement("div");
    ticketDiv.innerHTML = ticket;

    document.body.appendChild(ticketDiv);
}