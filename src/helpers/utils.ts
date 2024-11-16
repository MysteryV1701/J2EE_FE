import {default as dayjs} from 'dayjs';

export const formatDate = (date: string)  =>  dayjs(date).format(" D/MM/YYYY h:mm:ss");

export const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    return formatter.format(price);
};