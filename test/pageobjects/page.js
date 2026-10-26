const { browser, $ } = require('@wdio/globals')

module.exports = class Page {
    get pageTitle () { return $('[data-test="page-title"]') }
    get navMenu () { return $('[data-test="nav-menu"]') }

    open (path = '/') {
        return browser.url(path)
    }
}
