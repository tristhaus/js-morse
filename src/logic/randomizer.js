const alphabetCharArray = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
]

const toUnique = charArray => {

    const set = new Set(charArray)

    const retval = []

    for (const element of set) {
        retval.push(element)
    }

    return retval
}

const createRandomString = (charArray, count) => {

    const set = toUnique(charArray)

    let returnString = ''

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * charArray.length)
        returnString += set[randomIndex]
    }

    return returnString
}

export { alphabetCharArray, createRandomString, toUnique }
