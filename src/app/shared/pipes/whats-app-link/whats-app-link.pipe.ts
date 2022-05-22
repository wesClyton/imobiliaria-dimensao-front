import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whatsAppLink'
})
export class WhatsAppLinkPipe implements PipeTransform {

  transform(numberWhatsApp: string): string {
    return `https://api.whatsapp.com/send?phone=55${numberWhatsApp.replace(/\D/g, '')}`;
  }

}
