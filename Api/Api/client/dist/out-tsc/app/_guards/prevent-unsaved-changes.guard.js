import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PreventUnsavedChangesGuard = class PreventUnsavedChangesGuard {
    constructor(confrimService) {
        this.confrimService = confrimService;
    }
    canDeactivate(component) {
        if (component.editForm.dirty) {
            return this.confrimService.confirm();
        }
        return true;
    }
};
PreventUnsavedChangesGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PreventUnsavedChangesGuard);
export { PreventUnsavedChangesGuard };
//# sourceMappingURL=prevent-unsaved-changes.guard.js.map