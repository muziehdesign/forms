import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FormMessageService {
    private localeData: { [localeId: string]: any } = {};
    constructor(@Inject(LOCALE_ID) private localeId: string) {}

    getMessage(messageProps: string | { key: string; path?: string; message?: string; min?: number | Date; max?: number | Date; less?: number; more?: number, length?: number }, namespace?: string): string | undefined {
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

            return this.formatMessage(message, messageProps);
        } catch {
            return messageProps.key;
        }
    }

    private formatMessage(message: string, params: { min?: number | Date; max?: number | Date; less?: number; more?: number; length?: number }): string {
        let formatted = message;

        // Format min parameter
        if (params.min !== undefined) {
            const formattedMin = params.min instanceof Date
                ? params.min.toLocaleDateString(this.localeId)
                : params.min.toString();
            formatted = formatted.replace('{min}', formattedMin);
        }

        // Format max parameter
        if (params.max !== undefined) {
            const formattedMax = params.max instanceof Date
                ? params.max.toLocaleDateString(this.localeId)
                : params.max.toString();
            formatted = formatted.replace('{max}', formattedMax);
        }

        // Format less parameter
        if (params.less !== undefined) {
            formatted = formatted.replace('{less}', params.less.toString());
        }

        // Format more parameter
        if (params.more !== undefined) {
            formatted = formatted.replace('{more}', params.more.toString());
        }

        // Format length parameter
        if (params.length !== undefined) {
            formatted = formatted.replace('{length}', params.length.toString());
        }

        return formatted;
    }

    registerLocaleMessages(data: any, localeId: string) {
        this.localeData[localeId] = data;
        this.localeId = localeId;
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
