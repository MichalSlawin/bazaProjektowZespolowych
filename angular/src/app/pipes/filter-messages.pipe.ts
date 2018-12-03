import { Pipe, PipeTransform } from '@angular/core';
import {Message} from '../message';

@Pipe({
    name: 'filterMessages'
})
export class FilterMessagesPipe implements PipeTransform {

    transform(messages: Message[], searchValue: string) {
        if (!searchValue) {
            return messages;
        }

        return messages.filter(message => {
            return message.subject.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        });
    }

}
