/* const { body } = document

try {
  body.style.backgroundColor = lumiance("#6633cc", 0.5) 
} catch(e) {
  console.log("HOUVE UM ERRO: ", e.message)
} */

/* function lumiance (hex, luminosity = 0) {
  //hexadecimal é um valor que vai de 0 até f
  //contém 16 dígitos
  //0 = black
  //f= white

  //lógica para converter op hex em uma cor mais clara ou mais escura
  //aceito hex decimal com 3 e 6 digitos
  hex = hex.replace(/[^0-9a-f]/gi, '')
  const isValidHex = hex.length === 6 || hex.length === 3
  if (!isValidHex) throw new Error ("Invalid HEX")
  
  // se for 3 digitos, transformar para 6 digitos
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  
  //aplicar uma formula matematica para aumentar ou
  //diminuir a luminosidade de um hex

  //preciso transformar o hex em rgb
  const black = 0
  const white = 255

  const twoDigitGroup = hex.match(/([0-9a-f]){2}/gi)

  let newHex = "#"
  for (let twoDigit of twoDigitGroup) {
    const numberFromHex = parseInt(twoDigit, 16)
    const calculateLuminosity = numberFromHex + (luminosity * 255)
    
    const blackOrLuminosity = Math.max (black, calculateLuminosity)
    const partialColor = Math.min(white, blackOrLuminosity)
    const newColor = Math.round(partialColor)

    const numberToHex = newColor.toString(16)
    const finalHex = `0${numberToHex}`.slice(-2)
    newHex = newHex +finalHex
  }

  return newHex
} */

function cleanHex(hex) {
  return hex.replace(/[^0-9a-f]/gi, '')
}

function validateHex(hex) {
 const emptyHex = hex === ""
 // when:  6 or 3 digit
 const isValidHex = hex.length === 6 || hex.length === 3

 if(!isValidHex || emptyHex) throw new Error('Invalid hex color: ' + hex)
 
 return hex
}

function formatSixDigitHex(hex) {
 if(hex.length === 3) {
   hex = hex
     .split("")
     .reduce( (final, char) => final + (char + char), "")
 }
 
 return hex
}

function convertTwoCharGroup(hex) {
 return hex.match(/([0-9a-f]){2}/gi)
}

function addLumiance(luminosity) {
   const black = 0;
   const white = 255;
 
   return function(hex) {
     const numberFromHex = parseInt(hex, 16)
     const addLuminosity = numberFromHex + (white * luminosity)
     const blackOrLuminosity = Math.max(black, addLuminosity)
     const partialColor = Math.min(blackOrLuminosity, white)
     const alteredColor = Math.round(partialColor)
     const numericToHex = alteredColor.toString(16)
     const formatValueWhenLessThanTwoDigits = ("0" + numericToHex).slice(-2)


     return formatValueWhenLessThanTwoDigits
   }
}

function newColor(hex, luminosity){
 
 const r = luminosity(hex[0])
 const g = luminosity(hex[1])
 const b = luminosity(hex[2])
 
 return '#' + r + g + b
}

function darkenLighten(hex = "", luminosity = 0) {
 hex = cleanHex(hex)
 hex = validateHex(hex)
 hex = formatSixDigitHex(hex)
 hex = convertTwoCharGroup(hex)
 luminosity = addLumiance(luminosity)
 hex = newColor(hex, luminosity)
 return hex
}

const color = document.querySelector('[name="color"]')
const lumiance = document.querySelector('[name="lumiance"]')

color.addEventListener("change",  updateColor)
lumiance.addEventListener("input",  updateColor)

function updateColor() {

 const newValueInput = document.querySelector("[name=newvalue]")

 const newColor =  darkenLighten(color.value, lumiance.value / 100)
 newValueInput.value = newColor
 
 document.querySelector(".current-color")
   .style.backgroundColor = newColor
}

updateColor()