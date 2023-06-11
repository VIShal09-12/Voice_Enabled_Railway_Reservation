window.onload = function() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const nameInputField = document.querySelector('#name');
    const sourceInputField = document.querySelector('#source');
    const destinationInputField = document.querySelector('#destination');
    const dateInputField = document.querySelector('#travel-date');
    const classInputField = document.querySelector('#class');
    const confirmationInputField = document.querySelector('#confirmation');

    window.addEventListener('load', () => {
        askName();
    });

    // for payments


    const askName = () => {
        const question = new SpeechSynthesisUtterance('What is your name?');
        speechSynthesis.speak(question);
        setTimeout(() => {
            recognition.start();
        }, 1000);
    };

    const askSource = () => {
        const question = new SpeechSynthesisUtterance('Your bording station?');
        speechSynthesis.speak(question);
        setTimeout(() => {
            recognition.start();
        }, 1000);
    };

    const askDestination = () => {
        const question = new SpeechSynthesisUtterance('What is your destination?');
        speechSynthesis.speak(question);
        setTimeout(() => {
            recognition.start();
            generateTrainNames();
        }, 1000);
    };

    const askDate = () => {
        const question = new SpeechSynthesisUtterance('What is your travel date?');
        speechSynthesis.speak(question);
        setTimeout(() => {
            recognition.start();
        }, 1000);
    };

    const askclass = () => {
        const question = new SpeechSynthesisUtterance('Which coach do you want for your travel , your options are , First Ac, Second AC, Third AC, Sleeper , General ');
        speechSynthesis.speak(question);
        setTimeout(() => {
            recognition.start();
        }, 8000);
    };


    const confirmDetails = () => {
        const confirmMessage = new SpeechSynthesisUtterance(`Your travel details are as follows. Your name is ${nameInputField.value}. Source station is ${sourceInputField.value}. Destination station is ${destinationInputField.value}. Date of traveling is ${dateInputField.value}.`);
        speechSynthesis.speak(confirmMessage);
        setTimeout(() => {
            recognition.start();
        }, 6000);
    }

    const askconfirmation = () => {
        const confirmationQuestion = new SpeechSynthesisUtterance('Do you want to book your ticket with the above confirmed details?');
        speechSynthesis.speak(confirmationQuestion);
        setTimeout(() => {
            recognition.start();
        }, 3000);
    }



    const thankYouMessage = () => {
        const thankyou = new SpeechSynthesisUtterance('Thank you for booking tickets.');
    }

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;

        if (nameInputField.value === '') {
            updateInputField(nameInputField, speechResult);
            askSource();
        } else if (sourceInputField.value === '') {
            updateInputField(sourceInputField, speechResult);
            askDestination();
        } else if (destinationInputField.value === '') {
            updateInputField(destinationInputField, speechResult);
            askDate();
        } else if (dateInputField.value === '') {
            updateInputField(dateInputField, speechResult);
            recognition.stop();
            askclass();
        } else if (classInputField.value === '') {
            updateInputField(classInputField, speechResult);
            recognition.stop();
            askconfirmation();
            // generateTicket();
        } else if (confirmationInputField === '') {
            updateInputField(confirmationInputField, speechResult);
            recognition.stop();
            // generateTicket();
        } else if (confirmationInputField.value === '') {
            updateInputField(confirmationInputField, speechResult);
            if (speechResult.toLowerCase() === 'yes') {
                recognition.stop();
                window.location.href = './payment.html';
                askname();
                // generateTicket();
                // speechSynthesis.speak(thankYouMessage);
            } else {
                recognition.stop();
                const cancelMessage = new SpeechSynthesisUtterance('Ticket booking has been cancelled.');
                speechSynthesis.speak(cancelMessage);
                reset();
            }
        } else if (cardNameInputField === '') {
            updateInputField(cardNameInputField, speechResult);
            askCardNumber();
        } else if (cardNumberInputField === '') {
            updateInputField(cardNumberInputField, speechResult);
            askExpiryDate();
        } else if (cardExpiryNumberInputField === '') {
            updateInputField(cardExpiryNumberInputField, speechResult);
            askCvvNumber();
        } else if (cardCvvNumberInputField === '') {
            updateInputField(cardCvvNumberInputField, speechResult);
            generateTicket();
        }
    };

    const updateInputField = (inputField, value) => {
        inputField.value = value;
    };

    const startListeningButton = document.querySelector('#start-listening');
    startListeningButton.addEventListener('click', () => {
        askName();
    });

    // Simulate a click on the startListeningButton when the page loads
    startListeningButton.click();

    const stopListeningButton = document.querySelector('#stop-listening');
    stopListeningButton.addEventListener('click', () => {
        recognition.stop();
        console.log('Listening stopped');
    });

    const generateTicket = () => {
        console.log('Ticket generated!');
        const message = new SpeechSynthesisUtterance('Thank you. Your ticket has been generated.');
        speechSynthesis.speak(message);
    };
};

function generateTrainNumber() {
    let trainNumber = '';
    for (let i = 0; i < 5; i++) {
        trainNumber += Math.floor(Math.random() * 10);
    }
    return trainNumber;
}


function generateTicketId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let ticketId = "";

    // Add two random letters
    for (let i = 0; i < 2; i++) {
        ticketId += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Add four random digits
    for (let i = 0; i < 4; i++) {
        ticketId += Math.floor(Math.random() * 10);
    }

    return ticketId;
}

// Example usage
const randomTicketId = generateTicketId();
console.log(randomTicketId);




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
script >
    function generateTrainNames() {
        const source = document.getElementById("source").value;
        const destination = document.getElementById("destination").value;

        // Create an array of train names
        const trainNames = ["Rajdhani Express", `${source} - ${destination} Express`, "Shatabdi Express", `${source} Superfast Express`, `${destination} Duronto Express`, `${source} - ${destination} Jan Shatabdi Express`, `${destination} - ${source} Duronto Express`, `${destination} - ${source} Superfast Express`, `${source} Garib Rath Express`, `${destination} Garib Rath Express`];

        // Get the train name dropdown element
        const trainNameDropdown = document.getElementById("train-name");

        // Remove existing options from the dropdown
        trainNameDropdown.innerHTML = "";

        // Add 10 random train names to the dropdown
        for (let i = 0; i < 10; i++) {
            // Randomly select a train name from the trainNames array
            const randomTrainIndex = Math.floor(Math.random() * trainNames.length);
            const trainName = trainNames[randomTrainIndex];

            // Generate a random 5-digit train number
            const trainNumber = Math.floor(Math.random() * 90000) + 10000;

            // Generate a random departure time in hh:mm format
            const hours = Math.floor(Math.random() * 24);
            const minutes = Math.floor(Math.random() * 60);
            const departureTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            // Create an option element for the train name with the train number and departure time, and add it to the dropdown
            const option = document.createElement("option");
            option.text = `${trainName} (${trainNumber}) - Departure Time: ${departureTime}`;
            trainNameDropdown.add(option);
        }
    }