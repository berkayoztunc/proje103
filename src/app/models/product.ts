 
    export class Product {
        PRODUCT_ID: number; //genID
        PRODUCT: string; //100
        BUSINESS_MODEL: string; // enum: AGENCY || SERVICE
        BUSINESS_PARTNER_ID: number; //from Partner: value: PARTNER_ID view: PARTNER where ACTIVE===true
        PARTNER_CHANNEL_ID: number; // enum:
        BENEFIT_PACK_ID: number; //from BenefitPack: value: BENEFIT_PACK_ID view: BENEFIT_PACK where ACTIVE===true
        SOLDBY: string; // enum: CPP || BP
        SERVICE_TYPE_ID: number; //from ServiceType: value: SERVICE_TYPE_ID view: PREFIX + ' - '+SERVICE_TYPE where ACTIVE===true
        POLICY_LENGHT_MONTHS: number; // default: 12
        REFUND_CANCEL_PERIOD_DAYS: number;
        PRODUCT_TYPE: string; // enum: INDIVIDUAL || CORPORATE
        WELCOME: boolean; // default: false
        RENEWAL: boolean; // default: false
        GUIDE: boolean; // default: false
        DUPLICATE_CONTROL: boolean; // default: false
        ACTIVE: boolean; //default: true
        NEW_COMMISSION_RATE: number;
        RENEWAL_COMMISSION_RATE: number;
        MIGRATION_PRODUCT_ID: number;
        MIGRATION_DATE: Date;
        EXPLANATION: string; //sınırsız hatırlatma notları textarea
        PRICE: number;
        CURRENCY: string;//defaılt: TRY
        OLD_PRODUCT_ID: number;
        OLD_CAMPAIGN_ID: number;
        PRODUCT_SALE_TYPE: string;// enum: WHOLESALE || RETAIL
        
        
        }