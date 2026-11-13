
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("warehousegoodsissuefe.controller.View", {

        onInit: function () {
            this._scanner = null;
            this._scanHandled = false;
        },

        onSubmit: function () {
            var oInput = this.byId("issueIdInput");
            var sIssueId = oInput.getValue().trim();

            if (!sIssueId) {
                MessageBox.warning(
                    "Please enter or scan a Warehouse Issue ID."
                );
                oInput.focus();
                return;
            }

            this.getOwnerComponent().getRouter().navTo(
                "RouteDetails",
                { issueId: sIssueId }
            );
        },

        onOpenScanner: function () {
            this._scanHandled = false;
            this.byId("scannerDialog").open();
        },

        onScannerDialogOpen: function () {
            if (typeof Html5Qrcode === "undefined") {
                MessageBox.error(
                    "Barcode scanner library could not be loaded."
                );
                this.byId("scannerDialog").close();
                return;
            }

            this._scanner = new Html5Qrcode("barcode-reader", {
    formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.CODE_93,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.ITF,
        Html5QrcodeSupportedFormats.CODABAR,
        Html5QrcodeSupportedFormats.DATA_MATRIX,
        Html5QrcodeSupportedFormats.PDF_417
    ]
});

            var oConfig = {
                fps: 10,
                qrbox: {
                    width: 300,
                    height: 120
                },
                aspectRatio: 1.5
            };

            this._scanner.start(
                { facingMode: "environment" },
                oConfig,
                function (sDecodedText) {
                    if (this._scanHandled) {
                        return;
                    }

                    this._scanHandled = true;

                    var sIssueId = sDecodedText.trim();

                    this._stopScanner().then(function () {
                        this.byId("issueIdInput").setValue(sIssueId);
                        this.byId("scannerDialog").close();

                        MessageToast.show(
                            "Barcode scanned successfully: " + sIssueId
                        );
                    }.bind(this));

                }.bind(this),

                function () {
                    // Ignore frames where no barcode is detected.
                }
            ).catch(function (oError) {
                MessageBox.error(
                    "Unable to access the camera. Please check camera " +
                    "permission and try again.\n" + oError
                );

                this.byId("scannerDialog").close();
            }.bind(this));
        },

        _stopScanner: function () {
            if (!this._scanner) {
                return Promise.resolve();
            }

            var oScanner = this._scanner;
            this._scanner = null;

            return oScanner.stop().then(function () {
                oScanner.clear();
            }).catch(function () {
                // Scanner may already have stopped.
            });
        },

        onScannerDialogClose: function () {
            this._stopScanner();
        },

        onCloseScanner: function () {
            this.byId("scannerDialog").close();
        }

    });
});
