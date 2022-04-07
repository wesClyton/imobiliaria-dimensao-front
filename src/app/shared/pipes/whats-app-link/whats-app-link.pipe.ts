import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whatsAppLink'
})
export class WhatsAppLinkPipe implements PipeTransform {

  transform(numberWhatsApp: string): string {
    return `http://api.whatsapp.com/send?1=pt_BR&phone=${numberWhatsApp}`;
  }

}
