({
    switchImage: function (component, event) {
        const itemValue = event.getParam("value");
        let profUrl = $A.get('$Resource.Coffee_Honduras');
        let itemPrice = 0;
        switch (itemValue) {
            case "Honduras":
                profUrl = $A.get('$Resource.Coffee_Honduras');
                itemPrice = 220;
                break;
            case "Brazil":
                profUrl = $A.get('$Resource.Coffee_Brazil');
                itemPrice = 190;
                break;
            case "Guatemala":
                profUrl = $A.get('$Resource.Coffee_Guatemala');
                itemPrice = 250;
                break;
            case "Ethiopia":
                profUrl = $A.get('$Resource.Coffee_Ethiopia');
                itemPrice = 300;
                break;
            case "Colombia":
                profUrl = $A.get('$Resource.Coffee_Colombia');
                itemPrice = 330;
                break;
            default:
                profUrl = $A.get('$Resource.Coffee_Honduras');
                itemPrice = 0;
        }
        component.set("v.itemPrice", itemPrice);
        const quantityValue = component.find("itemFieldQuantity").get("v.value");
        const weightValue = component.find("itemFieldWeight").get("v.value");
        const totalPrice = itemPrice * this.returnWeightFactor(+weightValue) * quantityValue;
        if (totalPrice) {
            component.set("v.totalPrice", totalPrice);
        } else {
            component.set("v.totalPrice", itemPrice);
        }
        component.set("v.image", profUrl);
    },

    switchWeight: function (component, event) {
        const weightValue = +event.getParam("value");
        const itemPrice = component.get("v.itemPrice");
        const quantityValue = component.find("itemFieldQuantity").get("v.value");
        const totalPrice = itemPrice * this.returnWeightFactor(+weightValue) * quantityValue;
        component.set("v.totalPrice", totalPrice);
    },

    switchQuantity: function (component, event) {
        const quantityValue = event.getParam("value");
        const itemPrice = component.get("v.itemPrice");
        const weightValue = component.find("itemFieldWeight").get("v.value");
        const totalPrice = itemPrice * this.returnWeightFactor(+weightValue) * quantityValue;
        component.set("v.totalPrice", totalPrice);
    },

    returnWeightFactor: function (value) {
        let factor = 1;
        switch (value) {
            case 250: factor = 1;
                break;
            case 500: factor = 2;
                break;
            case 1000: factor = 4;
                break;
            default: factor = 1;
        }
        return factor;
    },

    validationMethod: function (component) {
        const nameField = component.find('itemFieldName');
        const nameFieldValue = nameField.get('v.value');
        const roastField = component.find('itemFieldRoast');
        const roastFieldValue = roastField.get('v.value');
        const weightField = component.find('itemFieldWeight');
        const weightFieldValue = weightField.get('v.value');
        const addressField = component.find('itemFieldAddress');
        const addressFieldValue = addressField.get('v.value');
        if (!nameFieldValue) {
            component.find('notifLib').showToast({
                "title": "Form warn:",
                "message": 'Choose the item!',
                "variant": "warning"
            });
            return false
        } else if (!roastFieldValue) {
            component.find('notifLib').showToast({
                "title": "Form warn:",
                "message": 'Choose the roast!',
                "variant": "warning"
            });
            return false
        } else if (!weightFieldValue) {
            component.find('notifLib').showToast({
                "title": "Form warn:",
                "message": 'Choose the weight!',
                "variant": "warning"
            });
            return false
        } else if (!addressFieldValue) {
            component.find('notifLib').showToast({
                "title": "Form warn:",
                "message": 'Fill the address field!',
                "variant": "warning"
            });
            return false
        } else {
            return true
        }
    },
})
