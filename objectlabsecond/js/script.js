"use strict";
/*Вывести задания из раздела “Объекты” в HTML на страницу браузера. Создать формы добавления новых элементов, реализовать возможность удаления и изменения данных. */

class Bank {
  constructor() {
    this.clients = [];
    this.createMenuBank();
    this.addClient();
    this.addDebitAccount();
  }
  createMenuBank() {
    let menu = new Page();
    return menu;
  }
  addClient() {
    let button =  document.querySelector('.add_client');
    let div = document.querySelector('.client_form');
    let card = document.getElementById('client-form');
    button.addEventListener('click', () => {
      let client = new Client();
      this.clients.push(client);
      this.showClient(client);
      div.classList.remove('form-popup-show');
      card.reset();
    })
  }
  showClient(client) {
    let table =  document.querySelector('.table');
    let tr = document.createElement('tr');
    tr.classList.add('tr');
    table.appendChild(tr);
    for(let key in client) {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.classList.add('td');
      td.innerText = client[key];
    }
  }
  addDebitAccount() {
    let button =  document.querySelector('.add_debit_account');
    let div = document.querySelector('.form_debit');
    let card = document.getElementById('client-form');
    button.addEventListener('click', () => {
      let account = new DebitAccount();
      let client = this.searchClient(account.identificationСode);
      client.debitAccounts.push(account);
      div.classList.remove('form-popup-show');
      card.reset();
    })
  }
  searchClient(identificationСode) {
    let client = this.clients.find(client => client.identificationСode === identificationСode);
    return client;
  }
} 
class Client {
  constructor() {
    this.identificationСode =  document.getElementById('id_inn').value
    this.name = document.getElementById('id_name').value;
    this.active = document.getElementById('id_active').value;
    this.registrationDate = new Date();
    this.debitAccounts = [];
    this.creditAccounts = [];
  }  
}
class DebitAccount {
  constructor() {
    this.identificationСode = document.getElementById('id_inn_client').value;
    this.activeAccount = document.getElementById('id_active_debit').value;
    this.cardExpiryDate = document.getElementById('id_card_data_debit').value;
    this.currencyType = document.getElementById('id_currency_debit').value;
    this.balance = document.getElementById('id_balance_debit').value; 
  }
}
class Page {
  constructor() {
    this.createPage();
  }
  createPage() {
    let page = this.collectBlocksPage();
    this.openCards();
  }
  collectBlocksPage() {
    let container = this.createContainer();
    let buttonCreateClient = this.createButton('Cоздать Клиента', 'create_client');
    let buttonOpenDebetAccount = this.createButton('Открыть дебетовый счет', ' open_debet');
    let table = this. createTable();
    let clientCard = this.createClientCard();
    let debetCard = this.createDebetCard();
    let page = container.append(buttonCreateClient, table, clientCard, debetCard, buttonOpenDebetAccount);
    return page;
  }
  createContainer() {
    let body = document.querySelector('body');
    let container = document.createElement('div');
    container.classList.add('container');
    body.appendChild(container);
    return container;
  }
  createClientCard() {
    let clientCard = this.createForm('client_form',['id_inn', 'id_name', 'id_active'], ['Введите ИНН Клиента','Введите Имя Клиента', 'aктивный/неактивный'] );
    let buttonAdd = this.createButton('Добавить Клиента', 'add_client');
    let buttonClose = this.createButton('Закрыть', 'сlose', 'client_form');
    clientCard.append(buttonAdd, buttonClose);
    return clientCard;
  }
  createDebetCard() {
    let debetCard = this.createForm('form_debit', ['id_inn_client', 'id_active_debit', 'id_card_data_debit', 'id_currency_debit', 'id_balance_debit'], ['Введите ИНН Клиента','Активный или Неактивный счет', 'Срок действия карты', 'Тип валюты', 'Введите баланс'] );
    let buttonAdd = this.createButton('Добавить счет', 'add_debit_account');
    let buttonClose = this.createButton('Отменить', 'сlose', 'form_debit');
    debetCard.append(buttonAdd, buttonClose);
    return debetCard;
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
  createTable() {
    let table = document.createElement('table');
    table.classList.add('table');
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let thInnerText = ['ИНН', 'Имя Клиента', 'Активность', 'Дата регистрации',  'Дебетовые счета', 'Кредитовые счета'];
    for(let i = 0; i < thInnerText.length; i++) {
      let th = document.createElement('th');
      th.innerText = thInnerText[i];
      th.classList.add('th');
      tr.appendChild(th);
    }
    return table;
  }
  createForm(classDivForm, inputsID, placeholders) {
    let divForm = document.createElement('div');
    divForm.setAttribute('class', classDivForm);
    divForm.classList.add('form-popup');
    let form = document.createElement('form');
    form.setAttribute('id', 'client-form');
    form.classList.add('form-container');
    for(let i = 0; i < inputsID.length; i++) {
      let input = document.createElement('input');
      input.setAttribute('id', inputsID[i]);
      input.setAttribute('placeholder', placeholders[i]);
      input.classList.add('input_form');
      form.appendChild(input);
    }
    divForm.appendChild(form);
    return divForm;
  }
  createButton(buttonsText, className) {
    let button = document.createElement('button');
    button.innerText = buttonsText;
    button.setAttribute('class', className);
    button.setAttribute('type', 'submit');
    button.classList.add('button');
    return button;
  }
}

let bank = new Bank();
console.log(bank);