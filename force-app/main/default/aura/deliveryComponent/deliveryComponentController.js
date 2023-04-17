({
    handleChangeName: function (component, event, helper) {
        helper.switchImage(component, event)
    },

    doInit: function (component, event, helper) {
        // Prepare a new record from template
        component.find("deliveryRecordCreator").getNewRecord(
            "DeliveryList__c", // sObject type (objectApiName)
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
            })
        );
    },

    handleSaveDelivery: function (component, event, helper) {
        let newDelivery = component.get("v.newDelivery");
        // newDelivery = component.get("v.deliveryFields");
        newDelivery.Contact__c = component.get("v.recordId");
        component.set("v.newDelivery", component.get("v.deliveryFields"));
        console.log(newDelivery);
        console.log(component.get("v.deliveryFields"));
        console.log(component.get("v.recordId"));

        component.find("deliveryRecordCreator").saveRecord(function (saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log('record is saved successfully');
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    }
})
