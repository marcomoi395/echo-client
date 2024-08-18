const formatAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND', minimumFractionDigits: 0
});

const formatDate = (dateString) => {
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const formatDataUtil = (data) => {
    return data?.result?.map(item => ({
        ...item,
        type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
        amount: formatAmount.format(item.amount),
        date: formatDate(item.date)
    })) || [];
}


export default formatDataUtil;