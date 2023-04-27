import { LightningElement, api } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";

import docxImport from "@salesforce/resourceUrl/docx";
import contactGrab from "@salesforce/apex/ContactGrabber.getAllRelatedContacts";

export default class DocumentGenerator extends LightningElement {

    @api recordId;
    downloadURL;
    _no_border = {
        top: { style: "single", size: 6, space: 1, color: "000000" },
        bottom: { style: "single", size: 6, space: 1, color: "000000" },
        left: { style: "single", size: 6, space: 1, color: "000000" },
        right: { style: "single", size: 6, space: 1, color: "000000" }
    };

    connectedCallback() {
        Promise.all([loadScript(this, docxImport)]).then(() => {
            this.renderButtons();
        });
    }

    renderButtons() {
        this.template.querySelector(".hidden").classList.add("not_hidden");
        this.template.querySelector(".hidden").classList.remove("hidden");
    }

    startDocumentGeneration() {
        contactGrab({ 'acctId': this.recordId }).then(contacts => {
            this.buildDocument(contacts);
        });
    }

    buildDocument(contactsPassed) {
        let document = new docx.Document({
            background: {
                color: "C45911",
            },
        });
        let tableCells = [];
        tableCells.push(this.generateHeaderRow());

        contactsPassed.forEach(contact => {
            tableCells.push(this.generateRow(contact));
        });

        this.generateTable(document, tableCells);
        this.generateDownloadLink(document);
    }

    generateHeaderRow() {
        let tableHeaderRow = new docx.TableRow({
            children: [
                new docx.TableCell({
                    children: [new docx.Paragraph({
                        text: "First Name",
                        spacing: {
                            after: 200,
                        },
                        heading: 'HeadingLevel.HEADING_1',
                    })],
                    borders: this._no_border
                }),
                new docx.TableCell({
                    children: [new docx.Paragraph({
                        text: "Last Name",
                        spacing: {
                            after: 200,
                        },
                    })],
                    borders: this._no_border
                })
            ],
            height: {
                value: 20,
                rule: 'HeightRule.EXACT'
            }
        });

        return tableHeaderRow;
    }

    generateRow(contactPassed) {
        let tableRow = new docx.TableRow({
            children: [
                new docx.TableCell({
                    children: [new docx.Paragraph({ children: [this.generateTextRun(contactPassed["FirstName"].toString())] })],
                    borders: this._no_border,
                    width: {
                        size: 3505,
                        type: 'WidthType.DXA',
                    },
                    indent: {
                        left: 720,
                    },
                }),
                new docx.TableCell({
                    children: [new docx.Paragraph({ children: [this.generateTextRun(contactPassed["LastName"].toString())] })],
                    borders: this._no_border,
                    width: {
                        size: 5505,
                        type: 'WidthType.DXA',
                    },
                })
            ],
            height: {
                value: 2000,
                rule: 'HeightRule.EXACT'
            }
        });

        return tableRow;
    }

    generateTextRun(cellString) {
        let textRun = new docx.TextRun({ text: cellString, size: 28, font: "Calibri" });
        return textRun;
    }

    generateTable(documentPassed, tableCellsPassed) {
        let docTable = new docx.Table({
            columnWidths: [3505, 5505],
            rows: tableCellsPassed,
            // width: {
            //     size: 4000,
            //     type: 'WidthType.DXA',
            // },
            indent: {
                size: 600,
                type: 'WidthType.DXA',
            }
        });

        documentPassed.addSection({
            children: [docTable]
        });
    }

    generateDownloadLink(documentPassed) {
        docx.Packer.toBase64String(documentPassed).then(textBlob => {
            console.log(documentPassed);
            this.downloadURL = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + textBlob;
            this.template.querySelector(".slds-hide").classList.remove("slds-hide");
        });
    }
}