import { MatPaginatorIntl } from '@angular/material';

const polishRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 z ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} z ${length}`;
};


export function PolishPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Ilość na stronę:';
    paginatorIntl.lastPageLabel = 'Ostatnia strona';
    paginatorIntl.firstPageLabel = 'Pierwsza strona';
    paginatorIntl.nextPageLabel = 'Następna strona';
    paginatorIntl.previousPageLabel = 'Poprzednia strona';
    paginatorIntl.getRangeLabel = polishRangeLabel;

    return paginatorIntl;
}
