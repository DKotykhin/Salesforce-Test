({
    styleHelperMethod: function (cmp, event, action) {
        const cmpTarget = cmp.find('changeIt');
        if (action === 'apply') {
            $A.util.addClass(cmpTarget, 'changeMe');
        } else {
            $A.util.removeClass(cmpTarget, 'changeMe');
        }
        // const buttonName = event.getSource().getLocalId();
        const buttonName = event.getSource().get("v.name");
        console.log(buttonName);
        cmp.set("v.setMeOnInit", buttonName);
    }
})
