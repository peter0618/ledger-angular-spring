export class NumberUtil {
    public static formatter({value}) {
        if (!value) {
            return;
        }
        return new Intl.NumberFormat('ko-KR', {style: 'currency', currency: 'KRW'})
            .format(Number.parseInt(value.toString()))
            .substr(1);
    }
}