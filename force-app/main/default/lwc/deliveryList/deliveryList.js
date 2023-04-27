import { LightningElement, api, wire } from 'lwc';

import getDelivery from '@salesforce/apex/DeliveryGrabber.getDelivery';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';

export default class DeliveryList extends LightningElement {

    @api recordId;
    deliveryList;
    error;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD, ACCOUNT_ID_FIELD] })
    record;

    @wire(getDelivery, {acctId: '$recordId'})
    wiredContact({ error, data }) {
        if (data) {
            console.log(data);
            this.deliveryList = data;
            this.error = undefined;
        } else if (error) {
            console.log(error);
            this.error = error;
            this.deliveryList = undefined;
        }
    }

    get name() {
        return getFieldValue(this.record.data, ACCOUNT_NAME_FIELD);
    }

    get id() {       
        return getFieldValue(this.record.data, ACCOUNT_ID_FIELD);
    }
}