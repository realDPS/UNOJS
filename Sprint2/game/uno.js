var colors = ["red", "blue", "yellow", "green"]; //black is separated(wildcards)
var values = [];
var specialCards = ["pick2", "reverse", "skip"];

//Add all values possible
for (let i = 0; i < 10; i++) {
	values.push(i);
}

//create organized deck
var deck = [];
for (let col = 0; col < colors.length; col++) {
	//combine values with colors
	for (let nb = 0; nb < values.length; nb++) {
		if (nb !== 0) {
			//There's only 1 zero per color
			deck.push({
				color: colors[col],
				value: values[nb]
			});
		}
		deck.push({
			color: colors[col],
			value: values[nb]
		});
		
	}
}


//add special cards
for (let col = 0; col < colors.length; col++)
{
	for (let i = 0; i < specialCards.length; i++){
		deck.push({
			color: colors[col],
			value: specialCards[i]
		});
	}
	// deck.push([colors[i], specialCards[j]]);
	
}


//add wildcards
for (let i = 0; i < 2; i++) {
	// deck.push(["black", i]);
	deck.push({
				color: "black",
				value: i
			});
}

//Randomize array using Durstenfeld
const shuffle =(array)=> {

	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

const dealCard =()=> deck.shift();


shuffle(deck);
console.log(deck);
