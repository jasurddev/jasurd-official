interface ModalCheckoutProps {
  onClose: () => void;
  totalPrice: number; // Tambah prop ini
}

export default function ModalCheckout({ onClose, totalPrice }: ModalCheckoutProps) {
  // ... logic sama
  
  // Update bagian tampilan harga:
  // <span>Harga Jasa</span> <span>{formatRupiah(totalPrice)}</span>
  // ...
}