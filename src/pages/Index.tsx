import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

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

export default function Index() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'original' | 'replica'>('all');
  const [testDriveDays, setTestDriveDays] = useState([1]);
  const [compareSlider, setCompareSlider] = useState([50]);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredSneakers = sneakers.filter(
    s => filterType === 'all' || s.type === filterType
  );

  const discount = testDriveDays[0] === 1 ? 15 : 20;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-wider">
            SNEAKER<span className="text-primary">LAB</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#test-drive" className="hover:text-primary transition-colors">Тест-драйв</a>
            <a href="#loyalty" className="hover:text-primary transition-colors">Программа</a>
            <Button size="sm" className="animate-glow-pulse">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Корзина
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Big Visual */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background opacity-50" />
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className={`space-y-6 ${heroLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <Badge className="mb-4 text-sm px-4 py-2 bg-primary/20 border-primary">
                <Icon name="Zap" size={14} className="mr-2" />
                Новый формат покупки кроссовок
              </Badge>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Оригинал или<br />
                <span className="text-glow text-primary">реплика?</span><br />
                Решите сами
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Единое пространство для коллекционеров и ценителей стиля. 
                Выбирайте между подлинностью и разумной альтернативой.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="hover-glow group">
                  Начать подбор
                  <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="neon-border">
                  <Icon name="Play" size={20} className="mr-2" />
                  Как это работает
                </Button>
              </div>
            </div>

            {/* Right: Big Sneaker Visual */}
            <div className={`relative ${heroLoaded ? 'animate-scale-in' : 'opacity-0'} delay-300`}>
              <div className="relative w-full h-[600px]">
                {/* Comparison Slider */}
                <div className="absolute inset-0">
                  <div className="relative h-full rounded-2xl overflow-hidden neon-border">
                    {/* Original Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
                      alt="Original"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Replica Image with Slider Mask */}
                    <div 
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - compareSlider[0]}% 0 0)` }}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
                        alt="Replica"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Slider Control */}
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4">
                      <Slider
                        value={compareSlider}
                        onValueChange={setCompareSlider}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Labels */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-4 py-2 rounded-lg">
                      <Badge variant="outline" className="border-primary">Оригинал 45,000₽</Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-4 py-2 rounded-lg">
                      <Badge variant="outline" className="border-secondary">Реплика 8,900₽</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse delay-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Как это работает</h2>
            <p className="text-xl text-muted-foreground">Простой путь к вашим кроссовкам</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item, idx) => (
              <Card 
                key={item.step}
                className="p-6 text-center hover-glow cursor-pointer bg-card/50 backdrop-blur"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={item.icon as any} size={32} className="text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Каталог</h2>
            <p className="text-xl text-muted-foreground mb-8">Оригинал и реплика — бок о бок</p>
            
            {/* Filters */}
            <div className="flex justify-center gap-4 flex-wrap">
              <Button 
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                className={filterType === 'all' ? 'animate-glow-pulse' : ''}
              >
                Все
              </Button>
              <Button 
                variant={filterType === 'original' ? 'default' : 'outline'}
                onClick={() => setFilterType('original')}
                className={filterType === 'original' ? 'animate-glow-pulse' : ''}
              >
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Оригинал
              </Button>
              <Button 
                variant={filterType === 'replica' ? 'default' : 'outline'}
                onClick={() => setFilterType('replica')}
                className={filterType === 'replica' ? 'animate-glow-pulse' : ''}
              >
                <Icon name="Sparkles" size={16} className="mr-2" />
                Премиум реплика
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSneakers.map((sneaker, idx) => (
              <Card 
                key={sneaker.id}
                className="overflow-hidden hover-glow cursor-pointer group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={sneaker.image}
                    alt={sneaker.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      sneaker.type === 'original' 
                        ? 'bg-primary border-primary' 
                        : 'bg-secondary border-secondary'
                    }`}
                  >
                    {sneaker.type === 'original' ? 'Оригинал' : 'Реплика'}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{sneaker.brand}</div>
                  <h3 className="text-xl font-semibold mb-3">{sneaker.name}</h3>
                  
                  {sneaker.type === 'replica' && (
                    <div className="mb-3 flex items-center gap-2">
                      <Icon name="Target" size={16} className="text-secondary" />
                      <span className="text-sm">Сходство: {sneaker.similarity}%</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${sneaker.similarity}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {sneaker.price.toLocaleString('ru-RU')} ₽
                    </div>
                    <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon name="ShoppingBag" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Drive */}
      <section id="test-drive" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 neon-border">
              <div className="text-center mb-8">
                <Badge className="mb-4 text-sm px-4 py-2 bg-secondary/20 border-secondary">
                  <Icon name="Zap" size={14} className="mr-2" />
                  Уникальное предложение
                </Badge>
                <h2 className="text-4xl font-bold mb-4">Тест-драйв реплики</h2>
                <p className="text-xl text-muted-foreground">
                  Поносите реплику 1-2 дня, оцените комфорт и обменяйте на оригинал со скидкой!
                </p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium mb-4">
                    На сколько дней?
                  </label>
                  <Slider
                    value={testDriveDays}
                    onValueChange={setTestDriveDays}
                    min={1}
                    max={2}
                    step={1}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 день</span>
                    <span className="font-bold text-foreground">{testDriveDays[0]} {testDriveDays[0] === 1 ? 'день' : 'дня'}</span>
                    <span>2 дня</span>
                  </div>
                </div>
                
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                  <div className="text-sm text-muted-foreground mb-2">Ваша скидка на оригинал</div>
                  <div className="text-6xl font-bold text-primary mb-2">{discount}%</div>
                  <div className="text-sm text-muted-foreground">
                    Экономия до {Math.round(45000 * discount / 100).toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                
                <Button size="lg" className="w-full animate-glow-pulse group">
                  Забронировать тест-драйв
                  <Icon name="Calendar" size={20} className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Loyalty Program */}
      <section id="loyalty" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Программа лояльности</h2>
            <p className="text-xl text-muted-foreground">Растите вместе с нами и получайте больше</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {loyaltyLevels.map((level, idx) => (
              <Card 
                key={level.name}
                className="p-8 text-center hover-glow relative overflow-hidden"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                
                <Icon 
                  name={level.icon as any} 
                  size={48} 
                  className={`mx-auto mb-4 ${level.color}`} 
                />
                
                <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  {level.threshold === 0 ? 'Стартовый' : `От ${level.threshold.toLocaleString('ru-RU')} ₽`}
                </div>
                
                <div className="text-4xl font-bold text-primary mb-4">
                  {level.discount}%
                </div>
                <div className="text-sm text-muted-foreground">скидка на все</div>
                
                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    <span>Бесплатная доставка</span>
                  </div>
                  {idx >= 1 && (
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      <span>Приоритетная обработка</span>
                    </div>
                  )}
                  {idx >= 2 && (
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      <span>Персональный менеджер</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                SNEAKER<span className="text-primary">LAB</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Оригинал и премиум реплики в одном месте
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">О компании</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Чат</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">+7 (999) 123-45-67</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">info@sneakerlab.ru</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Подписка</h4>
              <p className="text-sm text-muted-foreground mb-4">Узнавайте о новых релизах первыми</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email"
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm"
                />
                <Button size="sm">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>© 2024 SneakerLab. Все права защищены.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
