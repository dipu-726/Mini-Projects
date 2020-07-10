/**
*	utilis function
*/

myStorage = window.localStorage;

const DECIMAL = 10;
const MESSAGE_FOR_PAGE_REFRESH = "Page refreshes in 5 seconds";


const checkNumberMatched = (generated_number ,user_input) => {
	if(generated_number && user_input) {
		generated_number = generated_number.toString();
		user_input = user_input.toString();

		let count = 0;
		for(let i=0; i< user_input.length; i++){
			if(generated_number.charAt(i) == user_input.charAt(i)){
				count++;
			}
		}
		return count;
	}
}

const evaluateInput = () => {
	let user_input = document.getElementById('accept-input').value;
	let generated_number = myStorage.getItem('generated_number');

	if(!user_input || user_input.length >6 || user_input.length <=5){
		alert("Enter 6 digits");
		return;
	}
	else if(parseInt(generated_number) == parseInt(user_input)) {
			setMessageForUser({message:"Correct Guess",element_id:'message'});
	}
	else {
		const num = checkNumberMatched(generated_number,user_input);
		console.log(num)
		setMessageForUser({message:`${num} correct guess`,element_id:'message'});
	}
}

const randomNumLen = (len) => {
	let num = 1;
	for(let i=0;i<len;i++){
		num= num*10;
	}
	return num;
}

const generateRandomNumber = (len = 6) => {
	const num = Math.floor(Math.random()*randomNumLen(len))
	return num;
}

const evaluateUserInput = (actual_num, guessed_num) => {
	const result = (actual_num === guessed_num) ? true : false;
	
	return result;
}

const setRandomNumToLocalStorage = (value) => {
	if(value){
		myStorage.setItem("generated_number",value);
	}
}

const setMessageForUser = ({duration, message,element_id}) => {

	if(duration && message && element_id){
		document.getElementById(element_id).innerHTML = message;
		removeMessage({duration:duration,element_id:element_id});
		return;
	}
	else if (message && element_id) {
		document.getElementById(element_id).innerHTML = message;
		return;
	}
	return;
}



const removeMessage = ({duration, element_id}) => {
	if(duration){
		setTimeout(()=>{
			document.getElementById(element_id).innerHTML = '';
		},duration)
		return;
	}

	document.getElementById(element_id).innerHTML = '';
	return;
}



const hideElement = (element_id,duration) => {
	if(element_id && duration){
		let element = document.getElementById(element_id);
		setTimeout(()=> {
			element.style.display = 'none';
		return;
		},duration)
	}
	else if(element_id){
		let element = document.getElementById(element_id);
		element.style.display = 'none';
		return;
	}
}


const showElement = (element_id,duration) => {
	if(element_id && duration){
		let element = document.getElementById(element_id);
		setTimeout(()=> {
			element.style.display = 'inline-block';
		return;
		},duration)
	}
	else if(element_id){
		let element = document.getElementById(element_id);
		element.style.display = 'inline-block';
		return;
	}
}


/** 
* Entry point
*/

function getRandomNumber () {
	const randomNumber = generateRandomNumber();
	setRandomNumToLocalStorage(randomNumber);
	setMessageForUser({message: randomNumber, element_id:'generated-number'})
	hideElement('generate');
	showElement('guess',5000);
	showElement('replay',5000)
	showElement('accept-input',5000);
	hideElement('generated-number',5000)
	setMessageForUser({duration:5000,message:MESSAGE_FOR_PAGE_REFRESH,element_id:'message'});
}

const handleReplayClick = () => {
	location.reload();
}