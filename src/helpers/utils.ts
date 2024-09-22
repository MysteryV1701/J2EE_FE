import {default as dayjs} from 'dayjs';

export const formatDate = (date: number)  =>  dayjs(date).format("MMMM D, YYYY h:mm A");

export const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    return formatter.format(price);
};