({
    showMessageHelper: function (component, event, severity) {
        var messages = event.getParam("arguments");
        var displayMessage = "";

        if (messages) {
            displayMessage = messages.message;
        }
        var messagePanel = component.find("messages");

        $A.createComponents([
            [
                "ui:message", {
                    "title": severity.toUpperCase(),
                    "severity": severity,
                    "closable": true
                }
            ],
            [
                "ui:outputText", { "value": displayMessage }
            ]
        ],
            function (components, status, errorMessage) {
                if (status === "SUCCESS") {
                    var uimessage = components[0];
                    var uioutput = components[1];
                    uimessage.set("v.body", uioutput);
                    messagePanel.set("v.body", uimessage);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    removeMessageHelper: function (component) {
        var messagePanel = component.find("messages");
        messagePanel.set("v.body", [])
    }
})
