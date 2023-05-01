public with sharing class DeliveryGrabber {
    @AuraEnabled(cacheable=true)
    public static List<Delivery__c> getDelivery(String acctId) {
        try {
            return [
                SELECT Id, Name, Price__c, Quantity__c, Contact__c, 
                        Roast__c, Weight__c, Contact__r.Name, Contact__r.AccountId
                FROM Delivery__c 
                WHERE Contact__r.AccountId = :acctId               
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }
}