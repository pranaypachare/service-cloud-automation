public with sharing class CaseController {
    
    //fetch the assigned cases to the logged in user
    @AuraEnabled(cacheable=true)
    public static List<Case> getAssignedCases() {
        return [SELECT Id, CaseNumber, Subject, Status FROM Case WHERE OwnerId =: UserInfo.getUserId() ORDER BY CreatedDate DESC];
    }

    //update the status of the case
    @AuraEnabled
    public static void updateCaseStatus(Id caseId, string newStatus){
        try {
            Case caseRecord = [SELECT Id, Status FROM Case WHERE Id = :caseId LIMIT 1];
             if(caseRecord!=null){
                caseRecord.Status = newStatus;
                update caseRecord;
             }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    //fetch recommended solution for a case (dummy logic for now)
    @AuraEnabled(cacheable=true)
    public static List<String> getCaseRecommendedSolutions(Id caseId) {
        return new List<String>{'Recommended solution for the case'};
    }
}