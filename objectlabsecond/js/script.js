"use strict";
/*Вывести задания из раздела “Объекты” в HTML на страницу браузера. Создать формы добавления новых элементов, реализовать возможность удаления и изменения данных. */

class Bank {
  constructor() {
    this.clients = [];
    this.createMenuBank();
    this.addClient(); 
    this.addAccount();
  }
  createMenuBank() {
    let menu = new Page();
    return menu;
  }
  addClient() {
    let card = document.getElementById('client-form');
    let regexID = /^[0-9]{10}$/;
    let regexName = /^[a-zа-яё]+(?: [a-zа-яё]+)?$/i;
    let error = this.createError('Ошибка! Данные введены не коректно или не все поля заполнены');
    document.querySelector('.add_client').addEventListener('click', (event) => {
      event.preventDefault();
      let information = {};
      information['identificationСode'] = +document.getElementById('id_inn').value;
      information['name'] = document.getElementById('id_name').value;
      information['isActive'] = Boolean(document.getElementById('id_active').value);
      if(this.checkIsEmptyFields(card.querySelectorAll('.field')) && regexID.test(information['identificationСode']) && regexName.test(information['name'])) {
        let client = new Client(information);
        this.clients.push(client);
        this.showClient(client);
        error.remove();
        document.querySelector('.client-card').classList.remove('form-popup-show');
        card.reset();
      } else {
        card.appendChild(error);
      }
    })
  }
  addAccount() {
    let card = document.getElementById('account-form');
    let regexID = /^[0-9]{10}$/;
    let regexSuma = /^[0-9]{1,25}$/;
    let error = this.createError('Ошибка! Данные введены не коректно или не все поля заполнены');
    document.querySelector('.add_account').addEventListener('click', (event) => {
      event.preventDefault();
      let information = {};
      information['identificationСode'] = +document.getElementById('id_inn_account').value;
      information['isActiveAccount'] = Boolean(document.getElementById('id_active').value);
      information['cardExpiryDate'] = document.getElementById('id_card_data').value;
      information['currencyType'] = document.getElementById('id_currency').value;
      information['balance'] = +document.getElementById('id_balance').value;
      information['limit'] = +document.getElementById('id_limit').value;
      if(this.checkIsEmptyFields(card.querySelectorAll('.field')) && regexID.test(information['identificationСode']) && regexSuma.test(information['balance']) && regexSuma.test(information['limit'])) {
        let account = new Account(information);
        let client = this.searchClient(information['identificationСode']);
        client['accounts'].push(account);
        error.remove();
        document.querySelector('.account-card').classList.remove('form-popup-show');
        card.reset();
      } else {
        card.appendChild(error);
      }
    })
  }
  createError(innerText) {
    let error = document.createElement('div');
    error.className ='error';
    error.style.color = 'red';
    error.innerText = innerText;
    return error;
  }
  checkIsEmptyFields(array) {
    let fields = array;
    let result;
    for(let i = 0; i < fields.length; i++) {
      if(fields[i].value !== '') {
        result = true;
      } else {
        result = false;
        break;
      }
    }
    return result;
  }
  showClient(client) {
    let table =  document.querySelector('.table');
    let tr = document.createElement('tr');
    tr.classList.add('tr');
    table.appendChild(tr);
    for(let key in client) {
      if(key === 'accounts') {
        continue;
      }
      let td = document.createElement('td');
      tr.appendChild(td);
      td.classList.add('td');
      td.innerText = client[key];
    }
  }
  searchClient(identificationСode) {
    let client = this.clients.find(client => client.identificationСode === identificationСode);
    return client;
  }
} 
class Client {
  constructor(information) {
    this.identificationСode = information.identificationСode;
    this.name = information.name;
    this.isActive = information.isActive;
    this.registrationDate = new Date();
    this.accounts = [];  
  }   
}
class Account {
  constructor(information) {
    this.identificationСode = information.identificationСode;
    this.isActiveAccount = information.isActiveAccount;
    this.cardExpiryDate = information.cardExpiryDate;
    this.currencyType = information.currencyType;
    this.balance = information.balance;
    this.limit = information.limit;
    this.personalFunds = information.balance - information.limit;
  }
}
class Page {
  constructor() {
    this.createPage();
  }
  createPage() {
    let page = this.collectBlocksPage();
    this.openCards();
    this.сloseCards();
  }
  collectBlocksPage() {
    let container = this.createContainer();
    let buttonCreateClient = this.createButton('Cоздать Клиента', 'create_client');
    let buttonOpenAccount = this.createButton('Открыть счет', ' open_account');
    let buttonCalcAllMoney = this.createButton('Показать всего денег в банке', ' open_all_money');
    let table = this. createTable();
    let clientCard = this.createClientCard();
    let accountCard = this.createAccount();
    let allMoneyCard = this.createAllMoneyCard();
    let page = container.append(buttonCreateClient, table, buttonOpenAccount, buttonCalcAllMoney, clientCard, accountCard, allMoneyCard);
    return page;
  }
  createContainer() {
    let body = document.querySelector('body');
    let container = document.createElement('div');
    container.classList.add('container');
    body.appendChild(container);
    return container;
  }
  createTable() {
    let table = document.createElement('table');
    table.classList.add('table');
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let thInnerText = ['ИНН', 'Имя Клиента', 'Активность', 'Дата регистрации'];
    for(let i = 0; i < thInnerText.length; i++) {
      let th = document.createElement('th');
      th.innerText = thInnerText[i];
      th.classList.add('th');
      tr.appendChild(th);
    }
    return table;
  }
  createClientCard() {
    let card = this.createCard('client-card');
    let form = this.createForm('client-form');
    let fieldIdentificationСode = this.createInput('id_inn', 'Введите ИНН Клиента');
    let fieldName = this.createInput('id_name', 'Введите Имя Клиента');
    let fieldIsActive = this.createSelect('id_active');
    let activeOption = this.createOption(' ', 'Активный аккаунт');
    let inactiveOption = this.createOption('', 'Неактивный аккаунт');
    let buttonAdd = this.createButton('Добавить Клиента', 'add_client');
    let buttonClose = this.createButton('Закрыть', 'сlose', 'client_form');
    fieldIsActive.append(activeOption, inactiveOption);
    form.append(fieldIdentificationСode, fieldName, fieldIsActive);
    card.append(form, buttonAdd, buttonClose);
    return card;
  }
  createAccount() {
    let card = this.createCard('account-card');
    let form = this.createForm('account-form');
    let fieldIdentificationСode = this.createInput('id_inn_account', 'Введите ИНН Клиента');
    let fieldIsActivAccount = this.createSelect('id_active');
    let activeOption = this.createOption(' ', 'Активный аккаунт');
    let inactiveOption = this.createOption('', 'Неактивный аккаунт');
    let fieldCardExpiryDate = this.createInput('id_card_data', 'Срок действия карты');
    let fieldCurrencyType = this.createSelect('id_currency', 'Введите срок действия карты');
    let uaнOption = this.createOption('UAH', 'UAH');
    let usdOption = this.createOption('USD', 'USD');
    let eurOption = this.createOption('EUR', 'EUR');
    let fieldBalance = this.createInput('id_balance', 'Введите баланс');
    let fieldLimit = this.createInput('id_limit', 'Установите кредитный лимит');
    let buttonAdd = this.createButton('Добавить счет Клиенту', 'add_account');
    let buttonClose = this.createButton('Закрыть', 'сlose', 'client_form');
    fieldIsActivAccount.append(activeOption, inactiveOption);
    fieldCurrencyType.append(uaнOption, usdOption, eurOption);
    form.append(fieldIdentificationСode, fieldIsActivAccount, fieldCardExpiryDate, fieldCurrencyType, fieldBalance, fieldLimit);
    card.append(form, buttonAdd, buttonClose);
    return card;
  }
  createAllMoneyCard() {
    let card = this.createCard('all-money-card');
    let form = this.createForm('all-money-form');
    let input = this.createInput('id_all_money', '');
    let buttonClose = this.createButton('Закрыть', 'сlose', 'client_form');
    let buttonCalc = this.createButton('Показать сумму', 'calc_all_money');
    form.append(input);
    card.append(form,  buttonCalc, buttonClose);
    return card;
  }
  createButton(buttonsText, className) {
    let button = document.createElement('button');
    button.innerText = buttonsText;
    button.setAttribute('class', className);
    button.setAttribute('type', 'submit');
    button.classList.add('button');
    return button;
  }
  createCard(divClass) {
    let card = document.createElement('div');
    card.classList.add('form-popup');
    card.classList.add(divClass);
    return card;
  }
  createForm(idForm) {
    let form = document.createElement('form');
    form.setAttribute('id', idForm);
    form.classList.add('form-container');
    return form;
  }
  createInput(idInput, placeholderText) {
    let input = document.createElement('input');
    input.setAttribute('id', idInput);
    input.classList.add('field');
    input.classList.add('input_form');
    input.setAttribute('placeholder', placeholderText);
    return input;
  }
  createSelect(idSelect) {
    let select = document.createElement('select');
    select.setAttribute('id', idSelect);
    select.classList.add('input_form');
    return select;
  }
  createOption(value, innerText) {
    let option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerText = innerText;
    return option;
  }
  openCards() {
    let buttons = document.querySelectorAll('div.container > button');
    let cards = document.querySelectorAll('div.container > div');
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        cards[i].classList.toggle('form-popup-show');
      })
    }
  }
  сloseCards() {
    let buttons = document.querySelectorAll('.сlose');
    let cards = document.querySelectorAll('div.container > div');
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        cards[i].classList.remove('form-popup-show');
      })
    }
  } 
}
let bank = new Bank();

