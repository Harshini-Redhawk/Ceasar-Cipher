function caesarCipher(str, shift, modulo, caseOption, foreignOption) {
    shift = shift % modulo;  // Use user-defined modulo
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charMap = {};

    for (let i = 0; i < charSet.length; i++) {
        charMap[charSet[i]] = i;
    }

    return str.split('').map(char => {
        if (charMap[char] !== undefined) {
            let newIndex = (charMap[char] + shift + modulo) % modulo;
            let newChar = charSet[newIndex];

            if (caseOption === "uppercase") {
                newChar = newChar.toUpperCase();
            } else if (caseOption === "lowercase") {
                newChar = newChar.toLowerCase();
            } else if (caseOption === "maintain") {
                newChar = char === char.toUpperCase() ? newChar.toUpperCase() : newChar.toLowerCase();
            }

            return newChar;
        } else if (foreignOption === "ignore") {
            return char;
        } else if (foreignOption === "remove") {
            return '';
        } else {
            return char;
        }
    }).join('');
}

function encrypt() {
    const shift = parseInt(document.getElementById('shift').value);
    const modulo = parseInt(document.getElementById('modulo').value);
    const caseOption = document.getElementById('caseOption').value;
    const foreignOption = document.getElementById('foreignOption').value;
    const plainText = document.getElementById('plainText').value;
    const cipherText = caesarCipher(plainText, shift, modulo, caseOption, foreignOption);
    document.getElementById('cipherText').value = cipherText;
}

function decrypt() {
    const shift = parseInt(document.getElementById('shift').value);
    const modulo = parseInt(document.getElementById('modulo').value);
    const caseOption = document.getElementById('caseOption').value;
    const foreignOption = document.getElementById('foreignOption').value;
    const cipherText = document.getElementById('cipherText').value;
    const plainText = caesarCipher(cipherText, -shift, modulo, caseOption, foreignOption);
    document.getElementById('plainText').value = plainText;
}

function bruteforce() {
    const cipherText = document.getElementById('cipherText').value;
    const modulo = parseInt(document.getElementById('modulo').value);
    const caseOption = "maintain";
    const foreignOption = "ignore";
    let results = '';
    for (let shift = 1; shift < modulo; shift++) {  // Use modulo value to determine shifts
        const plainText = caesarCipher(cipherText, -shift, modulo, caseOption, foreignOption);
        results += `Shift ${shift}: ${plainText}\n`;
    }
    document.getElementById('results').value = results;
}
