import { AbstractControl } from "@angular/forms";

export class CiValidator {
  static validateCi(ci: AbstractControl) {
    if(ci.value == null) return null;
    if (ci.value.length == 10) {
      let thirdDigit = parseInt(ci.value.substring(2, 3));
      if (thirdDigit < 6) {
        let coefValCi = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let checker = parseInt(ci.value.substring(9, 10));
        let sum: number = 0;
        let digit: number = 0;
        for (let i = 0; i < (ci.value.length - 1); i++) {
          digit = parseInt(ci.value.substring(i, i + 1)) * coefValCi[i];
          sum += ((parseInt((digit % 10) + '') + (parseInt((digit / 10) + ''))));
        }
        sum = Math.round(sum);
        if ((Math.round(sum % 10) == 0) && (Math.round(sum % 10) == checker)) {
          return null;
        } else if ((10 - (Math.round(sum % 10))) == checker) {
          return null;
        } else {
          return { validateCi: true }
        }
      } else {
        return { validateCi: true }
      }
    } else {
      return { validateCi: true }
    }
  }
}


