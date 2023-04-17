({
    applyCSS: function (cmp, event, helper) {
        helper.styleHelperMethod(cmp, event, 'apply');
    },

    removeCSS: function (cmp, event, helper) {
        helper.styleHelperMethod(cmp, event, 'remove');
    },

    addText: function (cmp, event) {
        const cmpValue = cmp.get("v.whom")
        cmp.set("v.whom", cmpValue + '!')
    },

    doInit: function (cmp, event) {
        cmp.set("v.whom", "world");
        var action = cmp.get("c.getContacts");
        action.setParams({
            recordId: cmp.get("v.recordId")
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            var contacts = response.getReturnValue();
            console.log("1: ", state);
            console.log(contacts);
            cmp.set("v.State", state);
            cmp.set("v.Contacts", contacts);
        });
        $A.enqueueAction(action);
    },

    getNumbers: function (component, event, helper) {
        let numbers = [];
        for (let i = 0; i < 20; i++) {
            numbers.push({
                value: i * 2
            });
        }
        component.set("v.numbers", numbers);
    },

    inputClick: function (component, event, helper) {
        const inputCmp = component.find("inputCmp");
        const value = inputCmp.get("v.value");
        const myText = component.find("outNumber");
        if (isNaN(value)) {
            // inputCmp.set("v.errors", [{ message: "Input not a number: " + value }])
            inputCmp.setCustomValidity(`${value} is not a number`);
            myText.set("v.value", "");
        } else {
            // inputCmp.set("v.errors", null)
            inputCmp.setCustomValidity("");
            myText.set("v.value", value);
        }
        inputCmp.reportValidity();
    },

    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        console.log(eventParams.changeType);
        if(eventParams.changeType === "LOADED") {
           // record is loaded (render other component which needs record data value)
            console.log("Record is loaded successfully.");
            console.log("You loaded a record in " + 
                        component.get("v.simpleRecord.Name"));
        } else if(eventParams.changeType === "CHANGED") {
            // record is changed
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record            
            console.log(eventParams);
            console.log(JSON.parse(JSON.stringify(eventParams)));
        }
    }

})
