let creditNumberArray = [];

let MajorIndustryIndentifier = {
    1: () => 'Companias aérias',
    2: () => 'Companias aérias e outras tarefas futuras da indústria',
    3: () => 'Viagens, entreterimento, bancário e financeiro',
    4: () => 'Serviços Bancários e financeiros',
    5: () => 'Serviços Bancários e financeiros',
    6: () => 'Merchandising, bancário e financeiro',
    7: () => 'Petróleo, outras atribuições e tarefas futuras da indústria',
    8: () => 'Saúde, telecomunicações e outras tarefas futuras da indústria',
    9: () => 'Atribuições Nacionais',
}

let cardNetworkIDs = {
    3400: () => 'American Express',
    3700: () => 'American Express',

    3090: () => 'Dinner Club Internacional',
    3600: () => 'Dinner Club Internacional',
    3800: () => 'Dinner Club Internacional',
    3900: () => 'Dinner Club Internacional',

    6500: () => 'Discover Card',

    5018: () => 'Maestro',
    5020: () => 'Maestro',
    5038: () => 'Maestro',

    5000: () => 'Master Card',
    5400: () => 'Master Card',
    1900: () => 'Master Card',

    4026: () => 'Visa Electron',
    4260: () => 'Visa Electron',
    4405: () => 'Visa Electron',
    4508: () => 'Visa Electron',

    4024: () => 'Visa',
    4532: () => 'Visa',
    4556: () => 'Visa',
}

function verify_cc(creditNumber, creditInstance){
    if(typeof(creditNumber) != "string") console.log(`[Type error] credit number is not a string`)

    createArray(creditNumber)
    if(!checkLastDigit()) {
        console.log('[Validation error] Luhn algorithm failed')
        creditNumberArray = [];
        return;
    }
        

    cardID = cardNetworkIDs[creditNumberArray[0] + creditNumberArray [1] + creditNumberArray[2] + creditNumberArray[3]];
    MII = MajorIndustryIndentifier[creditNumberArray[0]];
    let INN = `${cardID} , ${MII}`;
    console.log(INN)

    creditNumberArray = [];
}


function createArray(creditNumber){
    for(let i=0; i < creditNumber.length; i++){
        creditNumberArray.push(creditNumber.charAt(i))
    }
}

function checkLastDigit(){
    let result = 0;
    let verifDigit = parseInt(creditNumberArray[creditNumberArray.length-1]);
    for(let i=2; i <= creditNumberArray.length; i++){
        number = parseInt(creditNumberArray[creditNumberArray.length-i]);
        // pos par
        // console.log((creditNumberArray.length-i) %2);
        if((creditNumberArray.length-i) %2 === 1){
            result += number;
        }
        // pos impar 
        else{
            if(number*2 > 9){
                result += number*2 -9;
            }
            else {
                result += number*2;
            }
        }
    }
    if((result + verifDigit)%10 === 0){
        return true;
    }
}   