const peopleRaw = await fetch('people.json');
const people = await peopleRaw.json();