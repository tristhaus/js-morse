describe('JSMorse', function () {
    it('on load: blinking signal, guess input enabled, check button disabled', function () {
        cy.visit('http://localhost:5173/js-morse/')

        cy.get('#signalSpan').should('have.html', '◉')
        cy.get('#signalSpan').should('have.html', ' ')

        cy.get('#resetButton').should('be.disabled')
        cy.get('#checkButton').should('be.disabled')
        cy.get('#guessInput').type('|')
    })

    it('random string: complete cycle', function () {
        cy.visit('http://localhost:5173/js-morse/')

        cy.get('#resetButton').should('be.disabled')
        cy.get('#checkButton').should('be.disabled')
        cy.get('#guessInput').type('|')
        cy.get('#checkButton').click()

        cy.get('#resetButton').should('be.enabled')
        cy.contains('span', 'Incorrect, was:')

        cy.get('#resetButton').click()

        cy.get('#resetButton').should('be.disabled')
        cy.get('#checkButton').should('be.disabled')
    })
})