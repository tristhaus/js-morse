const morseDotMinus = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..',
}

const supportedCharRegex = /^[A-Za-z ]*$/

const parseToMorseArrayElements = obj => {
    // implicit 3 `false` from previous char and added to this char
    const morseArrayElements = { ' ': [false] }

    for (const key in obj) {
        if (!Object.hasOwn(obj, key)) {
            continue
        }

        const dotMinus = obj[key]

        const separator = '|'
        const withSeparator = Array.from(dotMinus.split('').join(separator))

        morseArrayElements[key] = withSeparator.map(dotMinusOrSeparator => {
            switch (dotMinusOrSeparator) {
                case '.': return [true]
                case '-': return [true, true, true]
                case separator: return [false]
            }
        }).flat()
    }

    return morseArrayElements
}

const morseObject = parseToMorseArrayElements(morseDotMinus)

const stringToMorseArray = input => {

    if (typeof (input) !== 'string') {
        return []
    }

    if (!supportedCharRegex.test(input)) {
        return []
    }

    const trimmedDownCaseArray = Array.from(input.toLowerCase().trim())

    const result = trimmedDownCaseArray
        .map(char => [...morseObject[char], false, false, false])
        .flat()

    // implicit 3 `false` from previous char
    return [false, false, false, false, false, false, false, false, false, false, false].concat(result)
}

export { stringToMorseArray }
