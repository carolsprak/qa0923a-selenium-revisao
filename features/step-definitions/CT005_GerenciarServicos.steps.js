const {Given, Then, When, Before, After} = require('@cucumber/cucumber')

const assert = require('assert')
const webdriver = require('selenium-webdriver');
//SETUP CHROME DRIVER SELENIUM
var chrome = require('selenium-webdriver/chrome');
const ChromeDriver = require('chromedriver');
const {By, until} = require('selenium-webdriver');
var options   = new chrome.Options().headless();
let driver = new webdriver.Builder()
   .forBrowser('chrome')
   .withCapabilities(webdriver.Capabilities.chrome())
   .setChromeOptions(options)
   .build();

    Given('que o anunciante esteja autenticado', {timeout: 30 * 1000}, async () => { 
        await driver.get("http://publicazo.insprak.com/sign_in")
        await driver.manage().window().setRect({ width: 1388, height: 975 })
        await driver.get("http://publicazo.insprak.com/sign_in")
        await driver.findElement(By.id("user_email")).sendKeys("anne@mail.com")
        await driver.findElement(By.id("user_password")).click()
        await driver.findElement(By.id("user_password")).sendKeys("123456")
        await driver.findElement(By.name("commit")).click()
        await driver.wait(until.stalenessOf(await driver.findElement(By.css(".toast-message"))), 30000)
    });

    Given('que o serviço esteja publicado', {timeout: 30 * 1000}, async () => { 
        await driver.wait(until.elementIsVisible(await driver.findElement(By.css(".img-circle"))), 30000)
        await driver.findElement(By.css(".img-circle")).click()
        await driver.findElement(By.linkText("Serviços Anunciados")).click()
    });

    When('o anunciante clicar em Editar o serviço X', {timeout: 30 * 1000}, async () => { 
        await driver.findElement(By.css(".row:nth-child(9) .btn")).click()
    });

    Then('o serviço poderá ser visualizado.', {timeout: 30 * 1000}, async () => { 
        await driver.findElement(By.css(".panel > .panel-heading")).click()
        assert(await driver.findElement(By.css(".panel > .panel-heading")).getText() == "Informações")
        await driver.findElement(By.css(".img-circle")).click()
        await driver.findElement(By.linkText("Sair")).click()
    });

    When('o anunciante clicar em Editar o serviço Y', {timeout: 30 * 1000}, async () => { 
        await driver.findElement(By.css(".row:nth-child(9) .btn")).click()
    });

    When('o serviço poderá ser despublicado.', {timeout: 30 * 1000}, async () => { 
        await driver.findElement(By.id("unpublish_button")).click()    
      });

    Then('o sistema deverá exibir uma mensagem de sucesso ao despublicar', {timeout: 30 * 1000}, async () => { 
        {
            const elements = await driver.findElements(By.css(".toast-message"))
            assert(elements.length)
          }
        await driver.findElement(By.css(".img-circle")).click()
        await driver.findElement(By.linkText("Sair")).click()
    });

    When('o anunciante clicar em Editar o serviço Z', {timeout: 30 * 1000}, async () => { 
        await driver.findElement(By.css(".row:nth-child(9) .btn")).click()
    });

    When('o serviço despublicado poderá ser publicado.', {timeout: 30 * 1000}, async () => { 
        await driver.findElement(By.id("publish_button")).click()
      });

      Then('o sistema deverá exibir uma mensagem de sucesso ao publicar', {timeout: 30 * 1000}, async () => { 
        {
            const elements = await driver.findElements(By.css(".toast"))
            assert(elements.length)
          }
        await driver.findElement(By.css(".img-circle")).click()
        await driver.findElement(By.linkText("Sair")).click()
    });