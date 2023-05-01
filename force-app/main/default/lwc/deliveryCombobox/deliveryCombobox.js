import { LightningElement, api } from 'lwc';

export default class DeliveryCombobox extends LightningElement {
    @api value;
    @api label;
    @api options;

    handleChange(evt) {
        // console.log('detail: ', evt.detail.value);
        // console.log('target: ', evt.target.value);
        const event = new CustomEvent('comboboxclick', {
            detail: evt.detail
        });
        this.dispatchEvent(event);
    } 
}