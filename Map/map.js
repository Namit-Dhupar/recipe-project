/*Used for Key Value pairs ie 1 => 2, 3 => 4, 5 => 6
function Myfunction() { 
var maps = new Map([["Name","Namit"], ["Age",23], ["Post","Software"]]); 
console.log(maps);
}
Myfunction();*/

//Older Method and tedious method of finding sum of an array
function oldSum(){
let number = [1,2,3,4];
let sum = 0;
for(let n of number)
     sum += n;

 console.log(sum);
}
//oldSum();




//Newer and much elegant manner of finding the sum of the array

let numbers = [1,2,3,4];
/* Reduce Method
  1.) Converts the array by converting it to a single value
  2.) Loops through all the elements/objects
  3.) have 2 parameters (initial value, current Value)
  4.) Here we have initialised accum with 0
  5.) the working is as follows

  1st cycle: acc = 0 , curr = 1 => a = 0+1 = 1
  2nd cycle: acc = 1 , curr = 2 => a = 1+2 = 3
  3rd cycle: acc = 3 , curr = 3 => a = 3+3 = 6
  4th cycle: acc = 6 , curr = 4 => a = 6+4 = 10
*/
const sum = numbers.reduce((accum,curr) => {
 return accum+curr;
},0);

console.log(sum);