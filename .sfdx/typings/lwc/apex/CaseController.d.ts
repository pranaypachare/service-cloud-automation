declare module "@salesforce/apex/CaseController.getAssignedCases" {
  export default function getAssignedCases(): Promise<any>;
}
declare module "@salesforce/apex/CaseController.updateCaseStatus" {
  export default function updateCaseStatus(param: {caseId: any, newStatus: any}): Promise<any>;
}
declare module "@salesforce/apex/CaseController.getCaseRecommendedSolutions" {
  export default function getCaseRecommendedSolutions(param: {caseId: any}): Promise<any>;
}
