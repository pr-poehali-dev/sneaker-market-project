import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SizeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sneaker: {
    id: number;
    name: string;
    brand: string;
    type: 'original' | 'replica';
    price: number;
    image: string;
  };
  onAddToCart: (size: number) => void;
}

const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46];

export default function SizeSelector({
  open,
  onOpenChange,
  sneaker,
  onAddToCart,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(42);

  const handleAdd = () => {
    if (selectedSize) {
      onAddToCart(selectedSize);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Выберите размер</DialogTitle>
          <DialogDescription>
            {sneaker.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-4">
            <img
              src={sneaker.image}
              alt={sneaker.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-1">
                {sneaker.brand}
              </div>
              <h4 className="font-semibold mb-2">{sneaker.name}</h4>
              <Badge
                variant="outline"
                className={
                  sneaker.type === 'original'
                    ? 'border-primary text-primary'
                    : 'border-secondary text-secondary'
                }
              >
                {sneaker.type === 'original' ? 'Оригинал' : 'Реплика'}
              </Badge>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">Размер (EU)</label>
              <button
                className="text-sm text-primary hover:underline"
                onClick={() => {}}
              >
                Таблица размеров
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'default' : 'outline'}
                  className={`h-12 ${
                    selectedSize === size ? 'animate-glow-pulse' : ''
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Цена</span>
            <span className="text-2xl font-bold">
              {sneaker.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <Button
            size="lg"
            className="w-full animate-glow-pulse"
            onClick={handleAdd}
            disabled={!selectedSize}
          >
            <Icon name="ShoppingBag" size={18} className="mr-2" />
            Добавить в корзину
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
