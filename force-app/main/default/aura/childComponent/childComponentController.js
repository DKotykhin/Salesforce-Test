({
    showMessage: function (component, event, helper) {
        helper.showMessageHelper(component, event, 'confirm')
    },

    showErrorMessage: function (component, event, helper) {
        helper.showMessageHelper(component, event, 'error')
    },

    removeMessage: function (component, event, helper) {
        helper.removeMessageHelper(component)
    },

    fireComponentEvent: function (component, event, helper) {
        var componentEvent = component.getEvent("cmpEvent");
        var msgString = component.get("v.messageString");

        msgString = $A.util.isEmpty(msgString) ? "No Message" : msgString;

        componentEvent.setParams({
            "message": msgString,
            "label": "Number of inputs"
        });
        componentEvent.fire();
    },
})
