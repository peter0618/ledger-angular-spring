export class Ledger {
    id: number;
    sequence: number;
    stndDate: any;
    itemCode: string;
    itemName: string;
    note?: string;
    income?: number;
    expenditure?: number;
    balance?: number;
}

export class CommonCode {
    id: number;
    divCode: string;
    divCodeName: string;
    dtlCode: string;
    dtlCodeName: string;
    note?: string;
}