import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FormMessageService {
    private localeData: { [localeId: string]: any } = {};
    constructor(@Inject(LOCALE_ID) private localeId: string) {}

    getMessage(messageProps: string | { key: string; path?: string; message?: string; min?: number; max?: number; less?: number; more?: number, length?: number }, namespace?: string): string | undefined {
        if (typeof messageProps === 'string') {
            return messageProps;
        }

        try {
            const parts = messageProps.key.split('.');

            // get namespaced message
            if (namespace && namespace.length > 0 && messageProps.path && messageProps.path.length > 0) {
                const namespaced = this.getLocaleData([namespace, messageProps.path, ...parts]);
                if (namespaced !== undefined) {
                    return namespaced;
                }
            }

            // get global message
            const message = this.getLocaleData(parts);
            if (!message) {
                return messageProps.key;
            }

            // format message
            if (messageProps.min) {
                return message.replace('{min}', messageProps.min.toString());
            }

            if (messageProps.max) {
                return message.replace('{max}', messageProps.max.toString());
            }

            if (messageProps.less) {
                return message.replace('{less}', messageProps.less.toString());
            }

            if (messageProps.more) {
                return message.replace('{more}', messageProps.more.toString());
            }

            if (messageProps.length) {
                return message.replace('{length}', messageProps.length.toString());
            }

            return message;
        } catch {
            return messageProps.key;
        }
    }

    registerLocaleMessages(data: any, localeId: string) {
        this.localeData[localeId] = data;
    }

    private getLocaleData(keyParts: string[]): string | undefined {
        const messages = this.localeData[this.localeId] || this.localeData['en'];
        return keyParts.reduce((obj, part) => {
            if (obj?.[part] === undefined) {
                return undefined;
            }
            return obj[part];
        }, messages);
    }
}
