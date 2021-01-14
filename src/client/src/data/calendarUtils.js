function contrastingColor(hexcolor){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}

function padToTwo(numberString) {
  if (numberString.length < 2) {
      numberString = '0' + numberString;
  }
  return numberString;
}

function hexAverage() {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function (previousValue, currentValue) {
      return currentValue
          .replace(/^#/, '')
          .match(/.{2}/g)
          .map(function (value, index) {
              return previousValue[index] + parseInt(value, 16);
          });
  }, [0, 0, 0])
  .reduce(function (previousValue, currentValue) {
      return previousValue + padToTwo(Math.floor(currentValue / args.length).toString(16));
  }, '#');
}


export {
  contrastingColor,
  hexAverage
}

