import { useState, useEffect } from 'react';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal, { OrderData } from '@/components/CheckoutModal';
import OrderTrackingModal from '@/components/OrderTrackingModal';
import SizeSelector from '@/components/SizeSelector';
import ScrollToTop from '@/components/ScrollToTop';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import LoyaltySection from '@/components/LoyaltySection';
import { useToast } from '@/hooks/use-toast';

const sneakers = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High',
    brand: 'Nike',
    type: 'original' as const,
    price: 45000,
    similarity: 100,
    image: '/images/sneaker-1.jpg'
  },
  {
    id: 2,
    name: 'Air Jordan 1 Premium',
    brand: 'Nike',
    type: 'replica' as const,
    price: 8900,
    similarity: 98,
    image: '/images/sneaker-2.jpg'
  },
  {
    id: 3,
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    type: 'original' as const,
    price: 52000,
    similarity: 100,
    image: '/images/sneaker-3.jpg'
  },
  {
    id: 4,
    name: 'Yeezy Boost Premium',
    brand: 'Adidas',
    type: 'replica' as const,
    price: 9500,
    similarity: 97,
    image: '/images/sneaker-4.jpg'
  },
  {
    id: 5,
    name: 'New Balance 990v5',
    brand: 'New Balance',
    type: 'original' as const,
    price: 38000,
    similarity: 100,
    image: '/images/sneaker-5.jpg'
  },
  {
    id: 6,
    name: 'NB 990 Premium',
    brand: 'New Balance',
    type: 'replica' as const,
    price: 7200,
    similarity: 96,
    image: '/images/sneaker-6.jpg'
  }
];

interface CartItem {
  id: number;
  name: string;
  brand: string;
  type: 'original' | 'replica';
  price: number;
  image: string;
  size: number;
  quantity: number;
}

export default function Index() {
  const { toast } = useToast();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'original' | 'replica'>('all');
  const [compareSlider, setCompareSlider] = useState([50]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [sizeSelectorOpen, setSizeSelectorOpen] = useState(false);
  const [selectedSneaker, setSelectedSneaker] = useState<typeof sneakers[0] | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openSizeSelector = (sneaker: typeof sneakers[0]) => {
    setSelectedSneaker(sneaker);
    setSizeSelectorOpen(true);
  };

  const addToCart = (sneaker: typeof sneakers[0], size: number) => {
    const existingItem = cartItems.find(item => item.id === sneaker.id && item.size === size);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === sneaker.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        ...sneaker,
        size,
        quantity: 1
      }]);
    }
    toast({
      title: "Добавлено в корзину",
      description: `${sneaker.name} (Размер ${size})`,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Товар удален",
      description: "Товар удален из корзины",
    });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderComplete = (orderData: OrderData) => {
    console.log('Order completed:', orderData);
    setCheckoutOpen(false);
    setCartItems([]);
    toast({
      title: "Заказ оформлен!",
      description: `Номер заказа: ORD-2024-${Math.floor(Math.random() * 999999)}. Отслеживайте статус в разделе "Мои заказы"`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        cartCount={cartCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setCartOpen={setCartOpen}
        setTrackingOpen={setTrackingOpen}
      />

      <HeroSection
        heroLoaded={heroLoaded}
        compareSlider={compareSlider}
        setCompareSlider={setCompareSlider}
      />

      <CatalogSection
        sneakers={sneakers}
        filterType={filterType}
        setFilterType={setFilterType}
        openSizeSelector={openSizeSelector}
      />

      <HowItWorksSection />

      <LoyaltySection />

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        total={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        items={cartItems}
        total={cartTotal}
        onOrderComplete={handleOrderComplete}
      />

      <OrderTrackingModal
        open={trackingOpen}
        onOpenChange={setTrackingOpen}
      />

      {selectedSneaker && (
        <SizeSelector
          open={sizeSelectorOpen}
          onOpenChange={setSizeSelectorOpen}
          sneaker={selectedSneaker}
          onSelectSize={(size) => {
            addToCart(selectedSneaker, size);
            setSizeSelectorOpen(false);
          }}
        />
      )}

      <ScrollToTop />
    </div>
  );
}
