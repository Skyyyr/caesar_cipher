

// Unchangable variables to ref - purely to make it easier to read
const MIN_UPPER_CASE  = 65;
const MAX_UPPER_CASE = 90;
const MIN_LOWER_CASE = 97;
const MAX_LOWER_CASE  = 122;

/**
 * 
 * @param {string} stringToCipher The given string that will be getting ciphered
 * @param {int} cipherAmount The amount of shifting that needs to be done
 * @returns The given string converted to a ciphered string
 */
exports.caesarCipher = function(stringToCipher, cipherAmount) {
    /**
     * @param answerArray Initialized array used for storing our converted string characters
     */
    let answerArray = [];

    /**
     * @param arrayOfElements We break our string up to iterate over
     */
    const arrayOfElements = stringToCipher.split('');

    // Loop through the array
    for (let i = 0; i < arrayOfElements.length; i++) {
        /**
         * @param element The character at the given index
         */
        const element = arrayOfElements[i];

        /**
         * @param cElem The character at the given index converted to UEF
         */
        const cElem = element.charCodeAt(0);

        /**
         * @param isUpperCase Use this boolean to check if we are dealing with an uppercase
         */
        let isUpperCase = false;

        // If the character code value is not within the possible character code values then it wont be converted
        if (cElem < MIN_UPPER_CASE || cElem > MAX_LOWER_CASE || (cElem > MAX_UPPER_CASE && cElem < MIN_LOWER_CASE)) {
            // We push the element to the array and continue
            answerArray.push(element);
            continue;
        // If we are dealing with an uppercase letter make that boolean true
        } else if (element.match(/[A-Z]/)) {
            isUpperCase = true;
        }
        // We got this far so that means we need to convert the character and add it to the array
        answerArray.push(convertThatLetter(cElem, cipherAmount, isUpperCase));
    }
    // Return the array as a string
    return answerArray.join('');
};

/**
 * 
 * @param {int} uefChar Converted character from the array
 * @param {int} cipherAmount The amount we must 'cipher'/shift
 * @param {boolean} isUpperCase Is it uppercase?
 * @returns The converted character as a letter (string)
 */
function convertThatLetter(uefChar, cipherAmount, isUpperCase) {
    /**
     * @param rawCipher This is a temp variable that we use to set the shifted character before
     * checking if it went in/out of bounds
     */
    let rawCipher = uefChar + cipherAmount;

    /**
     * @param answerKey Set the answer value to the rawCipher because it could be in bounds
     */
    let answerKey = rawCipher;

    /**
     * @param mathModMin If it's uppercase, use the constant MIN_UPPER_CASE, otherwise use MIN_LOWER_CASE
     */
    const mathModMin = isUpperCase === true ? MIN_UPPER_CASE : MIN_LOWER_CASE;

    /**
     * @param mathModMax If it's uppercase, use the constant MAX_UPPER_CASE, otherwise use MAX_LOWER_CASE
     */
    const mathModMax = isUpperCase === true ? MAX_UPPER_CASE : MAX_LOWER_CASE;

    // If the value is below the most minimum value, do math
    if (rawCipher < mathModMin) {
        answerKey = mathModMax - ((mathModMin - rawCipher) - 1);
    // If the value is above the most maximum value, do slightly different math
    } else if (rawCipher > mathModMax) {
        answerKey = mathModMin + ((rawCipher - mathModMax) - 1);
    }

    // Return the character code as a string so it can be pushed to the array.
    return String.fromCharCode(answerKey);
}