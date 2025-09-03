// 1. Kandkhl module 'readline' bach nkhdmo bih f terminal
const readline = require("readline");
// 2. Kandiro interface bach n9raw mn keyboard (input) 
//    w n3rdo messages f terminal (output)
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });


function hotelCost(nights) {
    return nights * 140;
}


function planeRideCost(destination) {
    if (destination.toLowerCase() === "london") return 183;
    if (destination.toLowerCase() === "paris") return 220;
    return 300;
}


function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) cost *= 0.95; // 5% discount
    return cost;
}


function askQuestion(question, validate, callback) {
    rl.question(question, function (answer) {
        if (!validate(answer)) {
            console.log("⚠️ Invalid input, please try again!");
            return askQuestion(question, validate, callback); // 🔁 n3awd nsowlo
        }
        callback(answer);
    });
}

function totalVacationCost() {
    // 1️⃣ Nights
    askQuestion("Number of hotel nights? ", 
        answer => !isNaN(answer) && answer.trim() !== "", 
        (nightsInput) => {
            const nights = Number(nightsInput);

            // 2️⃣ Destination
            askQuestion("Destination? ", 
                answer => answer.trim() !== "", 
                (destination) => {

                    // 3️⃣ Car days
                    askQuestion("Number of rental car days? ", 
                        answer => !isNaN(answer) && answer.trim() !== "", 
                        (daysInput) => {
                            const days = Number(daysInput);

                            // 💰 Total
                            const total = hotelCost(nights) + planeRideCost(destination) + rentalCarCost(days);
                            console.log(`\n✅ Total vacation cost: $${total}`);
                            rl.close();
                        }
                    );
                }
            );
        }
    );
}

totalVacationCost();
