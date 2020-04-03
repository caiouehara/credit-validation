let arrayCredit = [];

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

let IssuerIdentificationNumber = {
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

function verify_cc(number){
    if(typeof(number) != "number"){
        console.log(`[Type error] credit number is not a number`)
        return;
    } 
    
    createArray(number)

    if(!checkLastDigit()) {
        console.log('[Validation error] Luhn algorithm failed')
        reset()
        return;
    }
        
    let stringIssuerID = arrayCredit[0].toString(10) + arrayCredit [1].toString(10) + arrayCredit[2].toString(10) + arrayCredit[3].toString(10);
    let stringCategoryID = arrayCredit[0].toString(10);

    let IssuerCompany = IssuerIdentificationNumber[stringIssuerID];
    let IndustryCategory = MajorIndustryIndentifier[stringCategoryID];

    let result = `${IssuerCompany} , ${IndustryCategory}`;
    console.log(result)

    reset();
    return;
}

function createArray(number){
    let stringCredit = number.toString(10);
    for(let i=0; i < stringCredit.length; i++){
        arrayCredit.push(parseInt(stringCredit.charAt(i)))
    }
}

function checkLastDigit(){
    let sumResult = 0;
    let verificationDigit = arrayCredit[arrayCredit.length - 1];
    
    for(let i=2; i <= arrayCredit.length; i++){
        let number =  arrayCredit[arrayCredit.length - i];

        // pos par
        if( (arrayCredit.length - i) %2 === 1){
            sumResult += number;
        }

        // pos impar 
        else{
            if(number*2 > 9){
                sumResult += number*2 -9;
            }
            else {
                sumResult += number*2;
            }
        }
    }

    if( (sumResult + verificationDigit) %10 === 0){
        return true;
    }
}   

function reset(){
    arrayCredit = [];
}