import * as data from "../helpers2/default_data.json"


describe('Покупка аватара', function () {                                // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {
    cy.visit('https://pokemonbattle.ru/');
    cy.get(':nth-child(1) > .auth__input').type(data.login);
    cy.get('#password').type(data.password);
    cy.get('.auth__button').click();
    cy.wait(2000);
    cy.get('.header__container > .header__id').click();
    cy.get('[href="/shop"]').click();
    cy.get('.available > button').first().click({ force: true });
    cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type(data.card_nubmer);
    cy.get(':nth-child(1) > .pay_base-input-v2').type(data.card_date);
    cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type(data.card_cvv);
    cy.get('.pay__input-box-last-of > .pay_base-input-v2').type(data.cardholder);
    cy.get('.pay-btn').click();
    cy.get('#cardnumber').type(data.approval_code);
    cy.get('.payment__submit-button').click();
    cy.contains('Покупка прошла успешно').should('be.visible'); 

    });
});