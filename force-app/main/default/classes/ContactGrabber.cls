public with sharing class ContactGrabber {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllRelatedContacts(String acctId){
        try {
            return [
                SELECT AccountId, Id, FirstName, LastName, Title 
                FROM Contact 
                WHERE AccountId = :acctId
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}