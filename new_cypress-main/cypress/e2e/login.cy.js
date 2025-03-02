import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {


    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
    });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); // Ввели верный логин
         cy.get(main_page.password).type(data.password); // Ввели верный пароль
         cy.get(main_page.login_button).click(); // Нажать войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авт. вижу текс
         cy.get(result_page.title).should('be.visible'); // текст виден пользователю
     })

     it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели логин без  @
        cy.get(main_page.password).type('data.password'); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажать войти
        
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю, что после авт. вижу текс
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // Ввели неверный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что после авт. вижу текс
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажать восстановить пароль

        cy.get(recovery_password_page.email).type(data.login); // ввели почту для восстановления
        cy.get(recovery_password_page.send_button).click(); // нажать отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю на совпадение текс
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('erman@dolnikov.ru'); // Ввели неверный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажать войти
        
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что после авт. вижу текс
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Проверить на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели неверный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажать войти
        
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авт. вижу текс
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

 }) 