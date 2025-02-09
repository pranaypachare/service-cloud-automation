import { LightningElement, wire } from 'lwc';
import getAssignedCases from '@salesforce/apex/CaseController.getAssignedCases';
import updateCaseStatus from '@salesforce/apex/CaseController.updateCaseStatus';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CaseList extends LightningElement {

    statusOptions = [
        { label: 'New', value: 'New' },
        { label: 'Working', value: 'Working' },
        { label: 'Closed', value: 'Closed' }
    ];


    cases = [];
    error;

    @wire(getAssignedCases)
    wiredCases({ error, data }) {
        if (data) {
            this.cases = data;
            this.error = undefined;
    } else if (error) {
            this.error = error;
            this.cases = undefined;
        }
    }

    handleStatusChange(event) {
        const caseId = event.target.dataset.id;
        const newStatus = event.target.value;

        updateCaseStatus({ caseId, newStatus })
        .then(() => {
            this.showToast('Success', 'Case  has been updated', 'success');
            return refreshApex(this.wiredCases);
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    showToast(title, message, type) {
        const event = new ShowToastEvent({
            title,
            message,
            variant: type
        });
        this.dispatchEvent(event);
    }

    handleViewDetails(event) {
        const caseId = event.target.dataset.id;
        console.log('Selected Case Id :', caseId);
    }
}