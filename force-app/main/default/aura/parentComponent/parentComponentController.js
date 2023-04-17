({
    methodFromChild: function (component, event, helper) {
        var childCmp = component.find("messages");
        component.set("v.valueFromChild", childCmp.get("v.valueForParent"))
    },

    handleShow: function (component, event, helper) {
        component.find("messages").show("Confirmation Message");
    },

    handleError: function (component, event, helper) {
        component.find("messages").error("Error Message");
    },

    handleRemove: function (component, event, helper) {
        component.find("messages").remove();
    },

    handleComponentEvent: function (component, event, helper) {
        var message = event.getParam("message");
        var label = event.getParam("label");

        component.set("v.MsgFromNotifier", message);
        component.set("v.label", label);

        var count = parseInt(component.get("v.eventCount") + 1);
        component.set("v.eventCount", count);
    },
})
