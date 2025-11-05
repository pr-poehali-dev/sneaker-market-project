import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal, { OrderData } from '@/components/CheckoutModal';
import OrderTrackingModal from '@/components/OrderTrackingModal';
import SizeSelector from '@/components/SizeSelector';
import ScrollToTop from '@/components/ScrollToTop';
import { useToast } from '@/hooks/use-toast';

const sneakers = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High',
    brand: 'Nike',
    type: 'original',
    price: 45000,
    similarity: 100,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80'
  },
  {
    id: 2,
    name: 'Air Jordan 1 Premium',
    brand: 'Nike',
    type: 'replica',
    price: 8900,
    similarity: 98,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
  },
  {
    id: 3,
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    type: 'original',
    price: 52000,
    similarity: 100,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80'
  },
  {
    id: 4,
    name: 'Yeezy Boost Premium',
    brand: 'Adidas',
    type: 'replica',
    price: 9500,
    similarity: 97,
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80'
  },
  {
    id: 5,
    name: 'New Balance 990v5',
    brand: 'New Balance',
    type: 'original',
    price: 38000,
    similarity: 100,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80'
  },
  {
    id: 6,
    name: 'NB 990 Premium',
    brand: 'New Balance',
    type: 'replica',
    price: 7200,
    similarity: 96,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
  }
];

const loyaltyLevels = [
  { name: 'Bronze', threshold: 0, discount: 5, icon: 'Award', color: 'text-orange-400' },
  { name: 'Silver', threshold: 30000, discount: 10, icon: 'Medal', color: 'text-gray-300' },
  { name: 'Gold', threshold: 70000, discount: 15, icon: 'Crown', color: 'text-yellow-400' }
];

const howItWorks = [
  { step: 1, title: 'Выбор категории', desc: 'Оригинал или реплика', icon: 'Search' },
  { step: 2, title: 'Примерка с курьером', desc: '2-3 размера на выбор', icon: 'Truck' },
  { step: 3, title: 'Проверка качества', desc: 'Сертификация подлинности', icon: 'ShieldCheck' },
  { step: 4, title: 'Получение заказа', desc: 'Доставка 2-5 дней', icon: 'Package' }
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
  const [totalPurchases] = useState(45000);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredSneakers = sneakers.filter(
    s => filterType === 'all' || s.type === filterType
  );

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const currentLevel = [...loyaltyLevels]
    .reverse()
    .find(level => totalPurchases >= level.threshold) || loyaltyLevels[0];
  
  const nextLevel = loyaltyLevels.find(level => level.threshold > totalPurchases);
  
  const progressToNext = nextLevel 
    ? ((totalPurchases - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100
    : 100;

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-wider">
            SNEAKER<span className="text-primary">LAB</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#loyalty" className="hover:text-primary transition-colors">Программа</a>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setTrackingOpen(true)}
            >
              <Icon name="Package" size={16} className="mr-2" />
              Мои заказы
            </Button>
            <Button 
              size="sm" 
              className="animate-glow-pulse relative"
              onClick={() => setCartOpen(true)}
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Корзина
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-secondary">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <a 
                href="#catalog" 
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Каталог
              </a>
              <a 
                href="#loyalty" 
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Программа
              </a>
              <Button 
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setTrackingOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                <Icon name="Package" size={16} className="mr-2" />
                Мои заказы
              </Button>
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background" />
        
        <div className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
              Оригинал или реплика?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Сравните качество визуально. Интерактивный слайдер покажет разницу между оригиналом и премиум-репликой
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${sneakers[0].image}')`,
                  clipPath: `inset(0 ${100 - compareSlider[0]}% 0 0)`
                }}
              />
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{
                  backgroundImage: `url('${sneakers[1].image}')`,
                  clipPath: `inset(0 0 0 ${compareSlider[0]}%)`
                }}
              />
              
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                style={{ left: `${compareSlider[0]}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <Icon name="MoveHorizontal" size={24} className="text-primary" />
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-black/80 px-4 py-2 rounded-lg">
                <span className="text-white font-bold">ОРИГИНАЛ</span>
                <p className="text-xs text-gray-300">45 000 ₽</p>
              </div>
              <div className="absolute top-4 right-4 bg-black/80 px-4 py-2 rounded-lg">
                <span className="text-white font-bold">РЕПЛИКА</span>
                <p className="text-xs text-gray-300">8 900 ₽</p>
              </div>
            </div>

            <div className="mt-6 px-4">
              <Slider
                value={compareSlider}
                onValueChange={setCompareSlider}
                max={100}
                step={1}
                className="cursor-pointer"
              />
              <p className="text-center text-sm text-muted-foreground mt-2">
                Двигайте слайдер для сравнения
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 hover-glow">
              <a href="#catalog">
                Смотреть каталог
              </a>
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Icon name="Info" size={20} className="mr-2" />
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Премиум каталог
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Выберите между оригиналом и качественной репликой
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
              className="hover-glow"
            >
              <Icon name="Grid3x3" size={18} className="mr-2" />
              Все ({sneakers.length})
            </Button>
            <Button
              variant={filterType === 'original' ? 'default' : 'outline'}
              onClick={() => setFilterType('original')}
              className="hover-glow"
            >
              <Icon name="Star" size={18} className="mr-2" />
              Оригиналы ({sneakers.filter(s => s.type === 'original').length})
            </Button>
            <Button
              variant={filterType === 'replica' ? 'default' : 'outline'}
              onClick={() => setFilterType('replica')}
              className="hover-glow"
            >
              <Icon name="Copy" size={18} className="mr-2" />
              Реплики ({sneakers.filter(s => s.type === 'replica').length})
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSneakers.map((sneaker, index) => (
              <Card 
                key={sneaker.id}
                className="overflow-hidden hover-glow cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={sneaker.image}
                    alt={sneaker.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      sneaker.type === 'original' 
                        ? 'bg-yellow-500 hover:bg-yellow-600' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                  >
                    {sneaker.type === 'original' ? 'Оригинал' : 'Реплика'}
                  </Badge>
                  {sneaker.type === 'replica' && (
                    <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-bold">
                        {sneaker.similarity}% схожесть
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">{sneaker.brand}</p>
                  <h3 className="text-xl font-bold mb-3">{sneaker.name}</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {sneaker.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full hover-glow"
                    onClick={() => openSizeSelector(sneaker)}
                  >
                    <Icon name="ShoppingBag" size={18} className="mr-2" />
                    Выбрать размер
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Как это работает
            </h2>
            <p className="text-muted-foreground text-lg">
              Простой процесс от выбора до получения
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <Card 
                key={item.step}
                className="p-6 text-center hover-glow animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as any} size={32} className="text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="loyalty" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Программа лояльности
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Покупайте больше — получайте больше выгоды
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ваш уровень</h3>
                  <Badge className="text-lg px-4 py-2 bg-primary">
                    <Icon name={currentLevel.icon as any} size={20} className="mr-2" />
                    {currentLevel.name}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Текущая скидка</p>
                  <p className="text-4xl font-bold text-primary">{currentLevel.discount}%</p>
                </div>
              </div>

              {nextLevel && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс до уровня {nextLevel.name}</span>
                    <span className="font-bold">
                      {totalPurchases.toLocaleString('ru-RU')} / {nextLevel.threshold.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <Progress value={progressToNext} className="h-3" />
                  <p className="text-sm text-muted-foreground text-center">
                    Осталось {(nextLevel.threshold - totalPurchases).toLocaleString('ru-RU')} ₽ до скидки {nextLevel.discount}%
                  </p>
                </div>
              )}
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {loyaltyLevels.map((level, index) => (
              <Card 
                key={level.name}
                className={`p-6 text-center hover-glow animate-fade-in ${
                  currentLevel.name === level.name ? 'border-primary border-2 shadow-lg' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon 
                  name={level.icon as any} 
                  size={48} 
                  className={`mx-auto mb-4 ${level.color}`} 
                />
                <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                <p className="text-muted-foreground mb-4">
                  От {level.threshold.toLocaleString('ru-RU')} ₽
                </p>
                <div className="text-4xl font-bold text-primary mb-2">
                  {level.discount}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Постоянная скидка
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
