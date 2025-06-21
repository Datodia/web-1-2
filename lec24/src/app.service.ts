import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private obj = {
    en: {
      name: "George",
      lastName: "Jones"
    },
    ka: {
      name: "გიორგი",
      lastName: "ბერიძე"
    }
  }
  getHello(lang) {
    return {
      name: this.obj[lang].name,
      lastName: this.obj[lang].lastName,
    }
  }
}
