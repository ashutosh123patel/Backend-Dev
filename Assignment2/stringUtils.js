function capitalizeString(str) {
    return str.toUpperCase();
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function countVowels(str) {
    const matches = str.match(/[aeiouAEIOU]/g);
    return matches ? matches.length : 0;
}

module.exports = {
    capitalizeString,
    reverseString,
    countVowels
};
