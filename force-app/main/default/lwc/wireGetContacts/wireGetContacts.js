import { LightningElement, api, wire } from 'lwc';

import getContacts from '@salesforce/apex/ContactGrabber.getAllRelatedContacts';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import ACCOUNT_FIELD from '@salesforce/schema/Account.Name';

// import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
// import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
// import TITLE_FIELD from '@salesforce/schema/Contact.Title';

export default class WireGetContacts extends LightningElement {
    @api recordId;
    contacts;
    error;

    // @wire(getRecord, {recordId: '$recordId', fields: 'Account.Name'})
    // record;
    @wire(getRecord, {recordId: '$recordId', fields: [ACCOUNT_FIELD]})
    record;

    @wire(getContacts, {acctId: '$recordId'})
    wiredContact({error, data}) {
        if (data) {
            // console.log(data);
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            console.log(error);
            this.error = error;
            this.contacts = undefined;
        }
    }
    // @wire(getRecord, {recordId: '$recordId', fields: [FIRST_NAME_FIELD, LAST_NAME_FIELD, TITLE_FIELD]})
    // wiredContact({error, data}) {
    //     if (data) {
    //         console.log(data);
    //         this.contacts = data;
    //         this.error = undefined;
    //     } else if (error) {
    //         console.log(error);
    //         this.error = error;
    //         this.contacts = undefined;
    //     }
    // }

    // get name() {
    //     return this.record.data.fields.Name.value;
    // }
    get name() {
        return getFieldValue(this.record.data, ACCOUNT_FIELD);
    }
}