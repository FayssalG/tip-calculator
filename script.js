const billInput = document.getElementById('bill')
const peopleInput = document.getElementById('people')

const tipSelectors = document.querySelectorAll('.tip-selector')


const tipAmountOutput = document.querySelector('.tip-amount-value')
const totalOutput = document.querySelector('.total-value')
const reset = document.querySelector('.reset')

reset.addEventListener('click' , ()=>{
    tipAmountOutput.textContent = '$0.00'
    totalOutput.textContent = '$0.00'
})


tipSelectors.forEach((tipSelector)=>{
    if(tipSelector.hasAttribute('data-value')){
        tipSelector.addEventListener('click' , ()=>{{
            console.log(checkInput())
            if (!checkInput()) return
            toggleActive(tipSelector,'button-active')
            render(billInput.value , tipSelector.getAttribute('data-value') , peopleInput.value)
        }})
    } 
    
    else{
        tipSelector.addEventListener('input' , ()=>{
            if (!checkInput()) return
            toggleActive(tipSelector , 'input-active')
            render(billInput.value , tipSelector.value , peopleInput.value)            
        })

    }
  
})





// Functions
function render(billInput , tipInput , peopleInput){
    if (tipInput == '' || parseInt(tipInput) == 0) {
        return
    }
    const billParsed = parseFloat(billInput)
    const peopleParsed = parseFloat(peopleInput) 
    const tipParsed = parseFloat(tipInput)
    const [calcTipAmount, calcTotal] = calculate(billParsed, tipParsed, peopleParsed)
    tipAmountOutput.textContent = '$'+calcTipAmount
    totalOutput.textContent = '$'+calcTotal
}

function checkInput(){
    const inputs = [billInput , peopleInput]
    let result = []
    inputs.forEach((input)=>{
        if(input.value == '' || parseInt(input.value)==0 ) {
            input.parentElement.classList.add('input-container-error')           
            result.push(false)
        }
        else{
            input.parentElement.classList.remove('input-container-error');
            result.push(true)
        }            
    })

    return result.includes(false) ? false : true
}


function toggleActive(tipSelector , className){
    tipSelectors.forEach((selector)=>{
        selector.classList.remove('button-active')
        selector.classList.remove('input-active')
    })
    tipSelector.classList.add(className)
}


function calculate(bill , tip , people){   

    const calcTipAmount = bill*(tip/100)/people
    const calcTotal = ( bill + bill * (tip/100) ) / people
    return [calcTipAmount.toFixed(2) , calcTotal.toFixed(2)]
}
