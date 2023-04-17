({
    switchImage: function (component, event) {
        const itemValue = event.getParam("value");
        let profUrl;
        switch (itemValue) {
            case "Honduras": profUrl = $A.get('$Resource.Coffee_Honduras');
                break;
            case "Brazil": profUrl = $A.get('$Resource.Coffee_Brazil');
                break;
            case "Guatemala": profUrl = $A.get('$Resource.Coffee_Guatemala');
                break;
            case "Ethiopia": profUrl = $A.get('$Resource.Coffee_Ethiopia');
                break;
            case "Colombia": profUrl = $A.get('$Resource.Coffee_Colombia');
                break;
            default: profUrl = $A.get('$Resource.Coffee_Honduras');
        }
        component.set("v.image", profUrl);
    },
})
