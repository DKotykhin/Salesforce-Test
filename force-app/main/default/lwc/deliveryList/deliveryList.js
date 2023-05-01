import { LightningElement, api, wire } from 'lwc';

import getDelivery from '@salesforce/apex/DeliveryGrabber.getDelivery';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';

export default class DeliveryList extends LightningElement {

    @api recordId;
    deliveryList;
    error;
    nameValue;
    itemValue;
    nameOptions;
    itemOptions;
    receivedData;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD, ACCOUNT_ID_FIELD] })
    record;

    @wire(getDelivery, { acctId: '$recordId' })
    wiredContact({ error, data }) {
        if (data) {
            console.log(data);
            this.receivedData = data;
            this.deliveryList = this.receivedData;

            this.nameOptions = data.map(item => item.Contact__r.Name);
            this.nameOptions = [...new Set(this.nameOptions)];
            this.nameOptions = this.nameOptions.map(item => ({ label: item, value: item }));
            this.nameOptions = [{ label: 'All', value: '' }, ...this.nameOptions];

            this.itemOptions = data.map(item => item.Name);
            this.itemOptions = [...new Set(this.itemOptions)];
            this.itemOptions = this.itemOptions.map(item => ({ label: item, value: item }));
            this.itemOptions = [{ label: 'All', value: '' }, ...this.itemOptions];

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

    // handleNameClick(event) {    
    //     this.itemValue = '';
    //     this.deliveryList = this.receivedData;
    //     this.nameValue = event.detail.value;
    //     this.deliveryList = this.deliveryList.filter(item => item.Contact__r.Name === event.detail.value);
    //     if (!this.deliveryList.length) {
    //         this.deliveryList = this.receivedData;
    //     }
    // }

    // handleItemClick(event) {    
    //     this.nameValue = '';
    //     this.deliveryList = this.receivedData;
    //     this.itemValue = event.detail.value;
    //     this.deliveryList = this.deliveryList.filter(item => item.Name === event.detail.value);
    //     if (!this.deliveryList.length) {
    //         this.deliveryList = this.receivedData;
    //     }
    // }

    handleClick(event) {       
        this.deliveryList = this.receivedData;
        if (event.target.name === 'name') {
            this.itemValue = '';
            this.nameValue = event.detail.value;
            this.deliveryList = this.deliveryList.filter(item => item.Contact__r.Name === event.detail.value);
        } else {
            this.nameValue = '';            
            this.itemValue = event.detail.value;
            this.deliveryList = this.deliveryList.filter(item => item.Name === event.detail.value);
        }
        if (!this.deliveryList.length) {
            this.deliveryList = this.receivedData;
        } 
        
    }
}