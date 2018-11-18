import { FilterMessagesPipe } from './filter-messages.pipe';

describe('FirstUpperPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterMessagesPipe();
        expect(pipe).toBeTruthy();
    });
});
