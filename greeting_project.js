// get user input
const name = process.argv[2];
// get current hours
const hours = new Date().getHours();

function sayGreeting(hours) {
    if (hours < 9) return "Good morning";
    if (hours < 16) return "Goode afternoon";
    if (hours < 4 || hours >= 19) return "Good night";
    return "Good evening";
};

const greetings = sayGreeting(hours);

console.log(`${greetings}, ${name}!`);

