import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface OrderTrackingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';
  items: {
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  trackingNumber?: string;
  deliveryAddress: string;
  estimatedDelivery?: string;
}

const mockOrder: Order = {
  id: 'ORD-2024-001234',
  date: '2024-11-05',
  status: 'in_transit',
  items: [
    {
      name: 'Air Jordan 1 Retro High',
      image: '/images/sneaker-1.jpg',
      quantity: 1,
      price: 45000,
    },
  ],
  total: 45000,
  trackingNumber: 'TR123456789RU',
  deliveryAddress: 'г. Москва, ул. Ленина, д. 1, кв. 1',
  estimatedDelivery: '2024-11-08',
};

const statusConfig = {
  processing: {
    label: 'Обрабатывается',
    color: 'bg-yellow-500',
    icon: 'Clock',
  },
  shipped: {
    label: 'Отправлен',
    color: 'bg-blue-500',
    icon: 'Package',
  },
  in_transit: {
    label: 'В пути',
    color: 'bg-purple-500',
    icon: 'Truck',
  },
  delivered: {
    label: 'Доставлен',
    color: 'bg-green-500',
    icon: 'CheckCircle',
  },
  cancelled: {
    label: 'Отменен',
    color: 'bg-red-500',
    icon: 'XCircle',
  },
};

const trackingSteps = [
  {
    status: 'processing',
    title: 'Заказ оформлен',
    desc: 'Мы получили ваш заказ',
    date: '05.11.2024 14:23',
    completed: true,
  },
  {
    status: 'shipped',
    title: 'Заказ отправлен',
    desc: 'Передан в службу доставки',
    date: '05.11.2024 18:45',
    completed: true,
  },
  {
    status: 'in_transit',
    title: 'В пути',
    desc: 'Посылка движется к вам',
    date: '06.11.2024 09:15',
    completed: true,
  },
  {
    status: 'delivered',
    title: 'Доставлен',
    desc: 'Заказ прибыл по адресу',
    date: '',
    completed: false,
  },
];

export default function OrderTrackingModal({
  open,
  onOpenChange,
}: OrderTrackingModalProps) {
  const [searchMode, setSearchMode] = useState(true);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);

  const handleSearch = () => {
    if (trackingNumber) {
      setOrder(mockOrder);
      setSearchMode(false);
    }
  };

  const handleReset = () => {
    setSearchMode(true);
    setTrackingNumber('');
    setOrder(null);
  };

  const currentStatus = order ? statusConfig[order.status] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="Package" size={24} />
            Отслеживание заказа
          </DialogTitle>
          <DialogDescription>
            Узнайте статус вашей посылки в режиме реального времени
          </DialogDescription>
        </DialogHeader>

        {searchMode ? (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-muted/30">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tracking">
                    Номер заказа или трек-номер
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="tracking"
                      placeholder="ORD-2024-001234 или TR123456789RU"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} className="hover-glow">
                      <Icon name="Search" size={18} />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Введите номер заказа из письма подтверждения или трек-номер
                  для отслеживания посылки
                </p>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center hover-glow cursor-pointer">
                <Icon
                  name="Mail"
                  size={32}
                  className="mx-auto mb-2 text-primary"
                />
                <h4 className="font-semibold mb-1">Проверьте почту</h4>
                <p className="text-xs text-muted-foreground">
                  Номер заказа в письме подтверждения
                </p>
              </Card>
              <Card className="p-4 text-center hover-glow cursor-pointer">
                <Icon
                  name="MessageSquare"
                  size={32}
                  className="mx-auto mb-2 text-primary"
                />
                <h4 className="font-semibold mb-1">SMS уведомление</h4>
                <p className="text-xs text-muted-foreground">
                  Трек-номер отправлен в SMS
                </p>
              </Card>
              <Card className="p-4 text-center hover-glow cursor-pointer">
                <Icon
                  name="User"
                  size={32}
                  className="mx-auto mb-2 text-primary"
                />
                <h4 className="font-semibold mb-1">Личный кабинет</h4>
                <p className="text-xs text-muted-foreground">
                  Все заказы в профиле
                </p>
              </Card>
            </div>
          </div>
        ) : order ? (
          <div className="space-y-6 animate-fade-in">
            {/* Order Header */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Заказ от {new Date(order.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <Badge
                  className={`${currentStatus?.color} text-white`}
                >
                  <Icon
                    name={currentStatus?.icon as any}
                    size={14}
                    className="mr-1"
                  />
                  {currentStatus?.label}
                </Badge>
              </div>

              {order.trackingNumber && (
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <Icon name="Barcode" size={18} className="text-primary" />
                  <span className="text-sm font-mono">
                    {order.trackingNumber}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-auto"
                    onClick={() =>
                      navigator.clipboard.writeText(order.trackingNumber!)
                    }
                  >
                    <Icon name="Copy" size={14} />
                  </Button>
                </div>
              )}

              {order.estimatedDelivery && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span>
                    Ожидаемая дата доставки:{' '}
                    <strong>
                      {new Date(order.estimatedDelivery).toLocaleDateString(
                        'ru-RU'
                      )}
                    </strong>
                  </span>
                </div>
              )}
            </Card>

            {/* Tracking Timeline */}
            <Card className="p-6">
              <h4 className="font-semibold mb-6 flex items-center gap-2">
                <Icon name="MapPin" size={18} />
                История перемещений
              </h4>
              <div className="space-y-6">
                {trackingSteps.map((step, idx) => (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon
                          name={
                            step.completed
                              ? 'Check'
                              : (statusConfig[
                                  step.status as keyof typeof statusConfig
                                ].icon as any)
                          }
                          size={18}
                        />
                      </div>
                      {idx < trackingSteps.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 mt-2 ${
                            step.completed ? 'bg-primary' : 'bg-muted'
                          }`}
                          style={{ minHeight: '40px' }}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h5 className="font-semibold mb-1">{step.title}</h5>
                      <p className="text-sm text-muted-foreground mb-1">
                        {step.desc}
                      </p>
                      {step.date && (
                        <p className="text-xs text-muted-foreground">
                          {step.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Товары в заказе</h4>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h5 className="font-semibold">{item.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        Количество: {item.quantity}
                      </p>
                      <p className="font-semibold mt-1">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span>{order.total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </Card>

            {/* Delivery Address */}
            <Card className="p-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="MapPin" size={18} />
                Адрес доставки
              </h4>
              <p className="text-muted-foreground">{order.deliveryAddress}</p>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                <Icon name="Search" size={16} className="mr-2" />
                Отследить другой заказ
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="HeadphonesIcon" size={16} className="mr-2" />
                Связаться с поддержкой
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}