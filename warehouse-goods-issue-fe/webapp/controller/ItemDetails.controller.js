sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "warehousegoodsissuefe/model/demoData"
], function (Controller, JSONModel, MessageBox, demoData) {
    "use strict";

    return Controller.extend("warehousegoodsissuefe.controller.ItemDetails", {

        onInit: function () {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteItemDetails")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var oRecord = demoData.getById(oArgs.issueId);

            if (!oRecord) {
                this._showNotFound();
                return;
            }

            var oItem = oRecord.items.find(function (item) {
                return String(item.item) === String(oArgs.itemId);
            });

            if (!oItem) {
                this._showNotFound();
                return;
            }

            var nAvailable = Number(
                oItem.availableQty !== undefined
                    ? oItem.availableQty
                    : oItem.stockBefore
            );

            var nOrdered = Number(oItem.quantity);
            var nBalance = nAvailable - nOrdered;

            var sCriticality;
            var sCriticalityText;
            var sCriticalityState;

            if (nBalance > 0) {
                sCriticality = "GREEN";
                sCriticalityText = "Stock Available";
                sCriticalityState = "Success";
            } else if (nBalance === 0) {
                sCriticality = "YELLOW";
                sCriticalityText = "Just Enough Stock";
                sCriticalityState = "Warning";
            } else {
                sCriticality = "RED";
                sCriticalityText = "Insufficient Stock";
                sCriticalityState = "Error";
            }

            this._issueId = oRecord.wiId;

            this.getView().setModel(new JSONModel({
                wiId: oRecord.wiId,
                plantId: oRecord.plantId,
                plantName: oRecord.plantName,
                storageLocation: oRecord.storageLocation,

                item: oItem.item,
                materialId: oItem.materialId,
                materialName: oItem.materialName,
                description: oItem.description,
                orderedQty: nOrdered,
                availableQty: nAvailable,
                balanceQty: nBalance,
                uom: oItem.uom,

                criticality: sCriticality,
                criticalityText: sCriticalityText,
                criticalityState: sCriticalityState,

                refurbishedProduct: oRecord.refurbishedProduct,
                referenceMaterial: oRecord.referenceMaterial,
                serialNumber: oRecord.serialNumber,
                refurbishmentRemarks: oRecord.refurbishmentRemarks
            }), "itemView");
        },

        _showNotFound: function () {
            MessageBox.error("Goods Issue or item was not found.", {
                onClose: function () {
                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("RouteView", {}, true);
                }.bind(this)
            });
        },

        onBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteDetails", {
                    issueId: this._issueId
                });
        }

    });
});
