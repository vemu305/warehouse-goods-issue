
sap.ui.define([], function () {
    "use strict";

    var oDemoData = {
        "WI-2026-0001": {
            wiId: "WI-2026-0001",
            status: "Ready for Submission",
            documentDate: "2026-10-19",
            documentTime: "10:30:00",

            employeeId: "EMP1001",
            employeeName: "Ravi Kumar",
            managerOnDuty: "Suresh Reddy",
            managerId: "MGR1001",

            plantId: "PL01",
            plantName: "Hyderabad Main Plant",
            plantLocation: "Hyderabad, Telangana",
            companyCode: "1000",
            storageLocation: "SL01",

            items: [
                {
                    item: "10",
                    materialId: "MAT1001",
                    materialName: "HP Monitor",
                    description: "HP 24-inch Monitor",
                    quantity: 2,
                    uom: "EA",
                    stockBefore: 150,
                    stockAfter: 148,
                    stockStatus: "Available",
                    stockState: "Success"
                },
                {
                    item: "20",
                    materialId: "MAT2002",
                    materialName: "HP Keyboard",
                    description: "HP USB Keyboard",
                    quantity: 1,
                    uom: "EA",
                    stockBefore: 80,
                    stockAfter: 79,
                    stockStatus: "Available",
                    stockState: "Success"
                }
            ],

            refurbishedProduct: "Yes",
            referenceMaterial: "REF1001",
            serialNumber: "SN123456",
            refurbishmentRemarks: "Screen changed"
        },

        "WI-2026-0002": {
            wiId: "WI-2026-0002",
            status: "Ready for Submission",
            documentDate: "2026-10-19",
            documentTime: "14:15:00",

            employeeId: "EMP1002",
            employeeName: "Priya Sharma",
            managerOnDuty: "Anil Kumar",
            managerId: "MGR1002",

            plantId: "PL02",
            plantName: "Bengaluru Plant",
            plantLocation: "Bengaluru, Karnataka",
            companyCode: "2000",
            storageLocation: "SL02",

            items: [
                {
                    item: "10",
                    materialId: "MAT3001",
                    materialName: "HP Laptop",
                    description: "HP Business Laptop",
                    quantity: 10,
                    uom: "PC",
                    stockBefore: 50,
                    stockAfter: 40,
                    stockStatus: "Available",
                    stockState: "Success"
                },
                {
                    item: "20",
                    materialId: "MAT3002",
                    materialName: "HP Charger",
                    description: "HP Laptop Charger",
                    quantity: 5,
                    uom: "EA",
                    stockBefore: 30,
                    stockAfter: 25,
                    stockStatus: "Available",
                    stockState: "Success"
                }
            ],

            refurbishedProduct: "No",
            referenceMaterial: "N/A",
            serialNumber: "N/A",
            refurbishmentRemarks: "Not applicable"
        },
        "WI-2026-0003": {
            wiId: "WI-2026-0003",
            status: "Ready for Submission",
            documentDate: "2026-10-19",
            documentTime: "15:00:00",

            employeeId: "EMP1003",
            employeeName: "Arjun Rao",
            managerOnDuty: "Meera Reddy",
            managerId: "MGR1003",

            plantId: "PL01",
            plantName: "Hyderabad Main Plant",
            plantLocation: "Hyderabad, Telangana",
            companyCode: "1000",
            storageLocation: "SL01",

            items: [
                {
                    item: "10",
                    materialId: "MAT001",
                    materialName: "Laptop",
                    description: "Business Laptop",
                    quantity: 100,
                    uom: "EA",
                    availableQty: 90
                },
                {
                    item: "20",
                    materialId: "MAT002",
                    materialName: "Mouse",
                    description: "Wireless Mouse",
                    quantity: 50,
                    uom: "EA",
                    availableQty: 75
                },
                {
                    item: "30",
                    materialId: "MAT003",
                    materialName: "Keyboard",
                    description: "USB Keyboard",
                    quantity: 25,
                    uom: "EA",
                    availableQty: 25
                }
            ],

            refurbishedProduct: "Yes",
            referenceMaterial: "REF1001",
            serialNumber: "SN123456",
            refurbishmentRemarks: "Sample refurbishment record"
        }
    };

    return {
        getById: function (sWiId) {
            return oDemoData[sWiId] || null;
        }
    };
});
