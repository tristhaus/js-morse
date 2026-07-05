import { describe, expect, test } from 'vitest'

import { alphabetCharArray, createRandomString, toUnique } from './randomizer'

describe('randomizer logic unit tests', () => {

    test('toUnique is idempotent for non-repeating chars', () => {

        const input = 'abc123'.split('')

        expect(input.length).toBe(6)

        const value1 = toUnique(input)

        expect(value1.length).toBe(6)

        const value2 = toUnique(value1)

        expect(value2.length).toBe(6)

        expect(value2).toContain('a')
        expect(value2).toContain('b')
        expect(value2).toContain('c')
        expect(value2).toContain('1')
        expect(value2).toContain('2')
        expect(value2).toContain('3')
    })

    test('toUnique removes duplicate chars', () => {

        const input = 'abc123abc123'.split('')

        expect(input.length).toBe(12)

        const actual = toUnique(input)

        expect(actual.length).toBe(6)
        expect(actual).toContain('a')
        expect(actual).toContain('b')
        expect(actual).toContain('c')
        expect(actual).toContain('1')
        expect(actual).toContain('2')
        expect(actual).toContain('3')
    })

    test('createRandomString creates string of given length', () => {
        const value1 = createRandomString('a', 5)

        expect(value1).toBe('aaaaa')

        const value2 = createRandomString('abcdef', 7)

        expect(value2.length).toBe(7)
    })

    test('alphabetCharArray has certain properties', () => {
        expect(alphabetCharArray.length).toBe(26)
    })
})
