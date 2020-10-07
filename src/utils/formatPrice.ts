export default function formatPrice(price: number): string {
  const options = { style: 'currency', currency: 'BRL' };
  const { format } = new Intl.NumberFormat('pt-BR', options);
  return format(price);
}
