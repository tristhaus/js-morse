describe('JSMorse', function () {
    it('on load: blinking signal, guess input enabled, check button disabled', function () {
        cy.visit('http://localhost:5173/js-morse/')

        cy.get('#signalSpan').should('have.html', '◉')
        cy.get('#signalSpan').should('have.html', ' ')

        cy.get('#checkButton').should('be.disabled')
        cy.get('#resetButton').should('be.disabled')

        cy.get('#guessInput').type('|')
    })

    it('random string: complete cycle', function () {
        cy.visit('http://localhost:5173/js-morse/')

        cy.get('#checkButton').should('be.disabled')
        cy.get('#resetButton').should('be.disabled')

        cy.get('#guessInput').type('|')
        cy.get('#checkButton').click()

        cy.contains('span', 'Incorrect, was:')
        cy.get('#resetButton').should('be.enabled')

        cy.get('#resetButton').click()

        cy.get('#checkButton').should('be.disabled')
        cy.get('#resetButton').should('be.disabled')
    })

    it('random string: change of length of secret resets game', function () {
        cy.visit('http://localhost:5173/js-morse/')

        cy.get('#checkButton').should('be.disabled')
        cy.get('#resetButton').should('be.disabled')

        cy.get('#guessInput').type('|')

        cy.get('#checkButton').should('be.enabled')

        cy.get('#signalLengthInput').type('{selectAll}{backspace}20')

        cy.get('#checkButton').should('be.disabled')
        cy.get('#resetButton').should('be.disabled')
        cy.get('#guessInput').should('have.value', '')
    })
})