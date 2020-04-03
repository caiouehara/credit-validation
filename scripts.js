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

let IssuerInitials = {
    AE: () => [3400, 3700],
    DCI: () => [3090, 3600, 3800, 3900],
    DC: () => [6500],
    MS: () => [5018, 5020, 5038],
    MC: () => [5000, 5400, 1900],
    VS: () => [4024, 4532, 4556],
}

function verify_cc(number){
    if(typeof(number) != "number"){
        console.log(`[Type error] credit number is not a number`)
        return;
    }
    if(number >= 1 * 10**16 ) {
        // Erro no método toString(), programa só aceita cadeia de caracteres abaixo de 16 (have to fix)
        console.log('[Input error] maxNumber have to be lower than 16 digits')
        return;
    }
    
    createArray(number)
    let verificationDigit = arrayCredit[arrayCredit.length-1];
    console.log(arrayCredit)

    if(!checkLastDigit(verificationDigit)) {
        console.log('[Validation error] Luhn algorithm failed, ' + verificationDigit + ' is not acceptaple')
        reset()
        return;
    }
        
    let stringIssuerID = arrayCredit[0].toString(10) + arrayCredit [1].toString(10) + arrayCredit[2].toString(10) + arrayCredit[3].toString(10);
    let stringCategoryID = arrayCredit[0].toString(10);

    let IssuerCompany = IssuerIdentificationNumber[stringIssuerID];
    let IndustryCategory = MajorIndustryIndentifier[stringCategoryID];

    let result = `${IssuerCompany} , ${IndustryCategory}`;

    reset();
    return result;
}

function create_cc(inputInitials, maxNumber){
    if(maxNumber >= 1 * 10**16 ) {
        // Erro no método toString(), programa só aceita cadeia de caracteres abaixo de 16 (have to fix)
        console.log('[Input error] maxNumber have to be lower than 16 digits')
        return;
    }
    if(IssuerInitials[inputInitials] == null) {
        console.log('[Input error] issuer initial dosen\'t exist')
    }
    else{
        let randomStringNumber = '';
        let randomStringIIN = IssuerInitials[inputInitials]()[Math.floor(Math.random() * (IssuerInitials[inputInitials]().length - 0)) + 0].toString(10);

        for(let i=0; i < maxNumber - 5; i++){
            randomStringNumber += Math.floor(Math.random() * 9).toString(10);
        }
        let lastDigit = createLastDigit(randomStringIIN + randomStringNumber);
        return parseInt(randomStringIIN + randomStringNumber + lastDigit);
    }
}

function createLastDigit(string){
    createArray(string);
    let randomLastDigit = 0;
    do{
        randomLastDigit = Math.floor(Math.random() * (9 - 0) + 0);
        arrayCredit.push(randomLastDigit)
        if(checkLastDigit(randomLastDigit)){
            console.log(arrayCredit)
            reset()
            return randomLastDigit;
        }
        else{
            arrayCredit.pop()
        }
    } while(!checkLastDigit(randomLastDigit));
}

function createArray(number){
    let stringCredit = number.toString(10);
    for(let i=0; i < stringCredit.length; i++){
        arrayCredit.push(parseInt(stringCredit.charAt(i)))
    }
}

function checkLastDigit(verifDigit){
    let sumResult = 0;
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

    if( (sumResult + verifDigit) %10 === 0){
        return true;
    }
    else{
        return false;
    }
}   

function reset(){
    arrayCredit = [];
}