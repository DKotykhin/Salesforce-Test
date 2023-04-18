({
    doInit: function (component, event, helper) {
        // Prepare a new record from template
        component.find("deliveryRecordCreator").getNewRecord(
            "Delivery__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function () {
                var rec = component.get("v.newDelivery");
                var error = component.get("v.newDeliveryError");
                if (error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.apiName);
                component.find("itemFieldQuantity").set("v.value", 1);
            })
        );
    },

    handleChangeName: function (component, event, helper) {
        helper.switchImage(component, event)
    },

    handleChangeWeight: function (component, event, helper) {
        helper.switchWeight(component, event);
    },

    handleChangeQuantity: function (component, event, helper) {
        helper.switchQuantity(component, event);
    },

    handleSaveDelivery: function (component, event, helper) {
        component.set("v.deliveryFields.Contact__c", component.get("v.recordId"));

        const totalPrice = component.get("v.totalPrice");
        component.set("v.deliveryFields.Price__c", totalPrice);

        const isValidate = helper.validationMethod(component);

        if (isValidate) {
            component.find("deliveryRecordCreator").saveRecord(function (saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    console.log('record is saved successfully');
                    $A.get("e.force:closeQuickAction").fire()
                    component.find('notifLib').showToast({
                        "title": "Record saving",
                        "message": 'Record is saved successfully!',
                        "variant": "success"
                    });
                } else if (saveResult.state === "INCOMPLETE") {
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
                    component.find('notifLib').showToast({
                        "title": "Something has gone wrong!",
                        "message": JSON.stringify(saveResult.error),
                        "variant": "error"
                    });
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }
    },
})
