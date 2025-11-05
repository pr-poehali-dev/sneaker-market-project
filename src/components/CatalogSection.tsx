import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Sneaker {
  id: number;
  name: string;
  brand: string;
  type: 'original' | 'replica';
  price: number;
  similarity: number;
  image: string;
}

interface CatalogSectionProps {
  sneakers: Sneaker[];
  filterType: 'all' | 'original' | 'replica';
  setFilterType: (type: 'all' | 'original' | 'replica') => void;
  openSizeSelector: (sneaker: Sneaker) => void;
}

export default function CatalogSection({ 
  sneakers, 
  filterType, 
  setFilterType, 
  openSizeSelector 
}: CatalogSectionProps) {
  const filteredSneakers = sneakers.filter(
    s => filterType === 'all' || s.type === filterType
  );

  return (
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
  );
}
