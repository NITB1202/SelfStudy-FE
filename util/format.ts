export const formatDateToISOString = (date: Date): string => {
    const padZero = (num: number): string => String(num).padStart(2, '0');
  
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // Tháng bắt đầu từ 0
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const formatDateTime = (input: string): string => {
    const [datePart, timePart] = input.split(" ");
    const [year, month, day] = datePart.split("-");
    return `${timePart} ${day}/${month}/${year}`;
};