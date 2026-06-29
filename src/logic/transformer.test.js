import { describe, expect, test } from 'vitest'

import { stringToMorseArray } from './transformer'

describe('transformer logic unit tests', () => {

    test('non-string returns empty array', () => {
        const result = stringToMorseArray(42)

        expect(result).toStrictEqual([])
    })

    test('string "ìnvâlíd" returns empty array', () => {
        const result = stringToMorseArray('ìnvâlíd')

        expect(result).toStrictEqual([])
    })

    test('string "a" returns expected', () => {
        const result = stringToMorseArray('a')

        expect(result).toStrictEqual([true, false, true, true, true,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    })

    test('string "et" returns expected', () => {
        const result = stringToMorseArray('et')

        expect(result).toStrictEqual([true,
            false, false, false,
            true, true, true,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    })

    test('string " cb a " returns expected', () => {
        const result = stringToMorseArray(' cb a ')

        expect(result).toStrictEqual([
            true, true, true, false, true, false, true, true, true, false, true,
            false, false, false,
            true, true, true, false, true, false, true, false, true,
            false, false, false,
            false, false, false, false,
            true, false, true, true, true,
            false, false, false,
            false, false, false, false, false, false, false, false, false, false, false])
    })
})
