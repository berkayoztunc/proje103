export class BenefitPackBenefit {
    BENEFIT_PACK_BENEFIT_ID: number; //genID
    BENEFIT_PACK_ID: number; //from BenefitPack: value: BENEFIT_PACK_ID view: BENEFIT_PACK where ACTIVE===true
    BENEFIT_ID: number; //from Benefit: value: BENEFIT_ID view: CAPTION where ACTIVE===true
    ACTIVE: boolean; //default: true
    ORDER_NUMBER: number; // Police basılırken benefitler yasal olarak belli bir sırayla yazılması gerekiyor. Şimdilik elle sıra numarası verecekler.
  }
// Yeni bir benefit pack tanımlandıktan ve katdedildikten sonra başka benefitpack'ten BenefitPackBenefit ler klonlanarak eklenmek isteniyor.
//  Sen bana yeni benefit_id ve klonlacak benefit_id gönderince sql de ben işlemi yapar benefit pack'e diğerinden kopyalarım.
// Sen sadece bir şekilde seçim yaptır ve bir düğme ile bana istek at

