const { $ } = require('@wdio/globals')
const Page = require('./page')

class LoginPage extends Page {
    get inputEmail () { return $('[data-test="email"]') }
    get inputPassword () { return $('[data-test="password"]') }
    get btnSubmit () { return $('[data-test="login-submit"]') }
    get loginError () { return $('[data-test="login-error"]') }

    open () {
        return super.open('/auth/login')
    }

    async enterEmail (email) {
        await this.inputEmail.setValue(email)
    }

    async enterPassword (password) {
        await this.inputPassword.setValue(password)
    }

    async submit () {
        await this.btnSubmit.click()
    }

    async loginAs ({ email, password }) {
        await this.open()
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.submit()
        await this.navMenu.waitForDisplayed()
    }
}

module.exports = new LoginPage()