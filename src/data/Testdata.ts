export const AdminUser = {
    admin: {
        username: 'noms@gmail.com',
        password: 'Password@2',
        
    },

};

export const invalidUsers = {
    invalidEmail: {
        username: 'Noms@gmail.com',
        password: '@12345678'
    }
};

export type NewInvoiceInput = {
    clientNameOrEmail?: string;
    clientAddress: string;
    coursesToAdd: number;
    selectedCourses: string[];
    DueDate: string;
    paymentStatus: string;
    additionalNotes: string;
};

export const InvoiceData = {
    newInvoice: {
        clientNameOrEmail: 'Ndosi Test Automation',
        clientAddress: '24 koedoe street, ext2 Lenasia',
        coursesToAdd: 4,
        selectedCourses: [
            // '31b1143b-aa19-4c20-bdf6-6700484b0dcb',
            // '31b1143b-aa19-4c20-bdf6-6700484b0dcb',
            // '31b1143b-aa19-4c20-bdf6-6700484b0dcb',
            // '31b1143b-aa19-4c20-bdf6-6700484b0dcb'
            'c6f37b71-6c68-4e59-98ec-05aac8affbe3',
            'c6f37b71-6c68-4e59-98ec-05aac8affbe3',
            'c6f37b71-6c68-4e59-98ec-05aac8affbe3',
            'c6f37b71-6c68-4e59-98ec-05aac8affbe3'
        ],
        DueDate:'2026-06-30',
        paymentStatus: 'paid',
        additionalNotes: 'Testing invoice creation'
    } as NewInvoiceInput
};