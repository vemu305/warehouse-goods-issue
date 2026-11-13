
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "warehousegoodsissuefe/model/demoData"
], function (Controller, JSONModel, MessageBox, demoData) {
    "use strict";

    return Controller.extend("warehousegoodsissuefe.controller.Details", {

        onInit: function () {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteDetails")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        _prepareData: function (oRecord) {
            var oData = JSON.parse(JSON.stringify(oRecord));

            var oSummary = {
                green: 0,
                yellow: 0,
                red: 0
            };

            oData.items.forEach(function (oItem) {
                var nAvailable = Number(
                    oItem.availableQty !== undefined
                        ? oItem.availableQty
                        : oItem.stockBefore
                );

                var nOrdered = Number(oItem.quantity);
                var nBalance = nAvailable - nOrdered;

                oItem.availableQty = nAvailable;
                oItem.balanceQty = nBalance;

                if (nBalance > 0) {
                    oItem.criticality = "GREEN";
                    oItem.criticalityText = "Stock Available";
                    oItem.criticalityState = "Success";
                    oSummary.green++;
                } else if (nBalance === 0) {
                    oItem.criticality = "YELLOW";
                    oItem.criticalityText = "Just Enough Stock";
                    oItem.criticalityState = "Warning";
                    oSummary.yellow++;
                } else {
                    oItem.criticality = "RED";
                    oItem.criticalityText = "Insufficient Stock";
                    oItem.criticalityState = "Error";
                    oSummary.red++;
                }
            });

            oData.summary = oSummary;
            return oData;
        },

        _onRouteMatched: function (oEvent) {
            var sWiId = oEvent.getParameter("arguments").issueId;
            var oRecord = demoData.getById(sWiId);

            if (!oRecord) {
                MessageBox.error("Goods Issue ID " + sWiId +
                    " was not found in the demo data.", {
                    onClose: function () {
                        this.getOwnerComponent()
                            .getRouter()
                            .navTo("RouteView", {}, true);
                    }.bind(this)
                });
                return;
            }

            this.getView().setModel(
                new JSONModel(this._prepareData(oRecord)),
                "view"
            );
        },

        onItemPress: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("view");

            if (!oContext) {
                return;
            }

            var oItem = oContext.getObject();
            var sWiId = this.getView()
                .getModel("view")
                .getProperty("/wiId");

            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteItemDetails", {
                    issueId: sWiId,
                    itemId: String(oItem.item)
                });
        },

        onSubmit: function () {
            var oModel = this.getView().getModel("view");
            var oData = oModel.getData();

            if (oData.summary.red > 0) {
                MessageBox.error(
                    "Submission blocked: " + oData.summary.red +
                    " item(s) have insufficient stock."
                );
                return;
            }

            oModel.setProperty("/status", "Submitted");

            MessageBox.success(
                "Goods Issue " + oData.wiId +
                " was submitted in demo mode."
            );
        },

        onCancel: function () {
            MessageBox.confirm(
                "Cancel and return to the scan screen?",
                {
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.OK) {
                            this.getOwnerComponent()
                                .getRouter()
                                .navTo("RouteView", {}, true);
                        }
                    }.bind(this)
                }
            );
        },

        onBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteView");
        }

    });
});
