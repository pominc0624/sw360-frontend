// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { viewSelectors } from './selectors'

const verifyFileExported = () => {
    const currentDate = new Date().toISOString().split("T")[0]
    const downloadedFileName = `components-${currentDate}.xlsx`
    cy.verifyDownloadedFile(downloadedFileName)
}

describe('Export Spreadsheet', () => {
    beforeEach(() => {
        cy.login('admin')
        cy.visit(`${Cypress.env('sw360_base_url')}/components`)
        cy.removeDownloadsFolder()
    })

    it('TC13: Export components without releases', () => {
        cy.get(viewSelectors.btnExportSpreadsheet).click()
        cy.get(viewSelectors.btnExportComponentsOnly).click()
        verifyFileExported()
    })

    it('TC14: Export components with releases', () => {
        cy.get(viewSelectors.btnExportSpreadsheet).click()
        cy.get(viewSelectors.btnExportComponentsWithReleases).click()
        verifyFileExported()
    })
})
