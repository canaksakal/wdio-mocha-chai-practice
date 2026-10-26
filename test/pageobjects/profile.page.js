const { browser, $ } = require('@wdio/globals')
const { expect } = require('chai')
const Page = require('./page')

class ProfilePage extends Page {
    get inputFirstName () { return $('[data-test="first-name"]') }
    get inputPhone () { return $('[data-test="phone"]') }
    get inputPostalCode () { return $('[data-test="postal_code"]') }
    get inputState () { return $('[data-test="state"]') }
    get btnUpdate () { return $('[data-test="update-profile-submit"]') }
    get successMessage () { return $('.alert-success') }

    async open () {
        await super.open('/account/profile')
        await browser.waitUntil(
            async () => (await this.inputFirstName.getValue()) !== '',
            { timeoutMsg: 'The profile data was not loaded' }
        )
    }

    async fillRequiredFields ({ postalCode, state }) {
        if (!(await this.inputPostalCode.getValue())) {
            await this.inputPostalCode.setValue(postalCode)
        }
        if (!(await this.inputState.getValue())) {
            await this.inputState.setValue(state)
        }
    }

    async updatePhone (phoneNumber) {
        await this.inputPhone.setValue(phoneNumber)
        await this.btnUpdate.click()
    }

    async expectSuccess (expectedMessage) {
        await this.successMessage.waitForDisplayed()
        expect(await this.successMessage.getText()).to.include(expectedMessage)
    }

    async expectPhoneInvalid () {
        await browser.waitUntil(
            async () => (await this.inputPhone.getAttribute('class')).includes('is-invalid'),
            { timeoutMsg: 'The phone field was not marked as invalid' }
        )
    }

    async expectPhoneNumber (expectedPhone) {
        await this.open()
        expect(await this.inputPhone.getValue()).to.equal(expectedPhone)
    }
}

module.exports = new ProfilePage()
