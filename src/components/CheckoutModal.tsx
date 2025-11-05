import { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onComplete: (orderData: OrderData) => void;
}

export interface OrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  deliveryMethod: string;
  paymentMethod: string;
}

const deliveryMethods = [
  {
    id: 'courier',
    name: 'Курьерская доставка',
    time: '2-3 дня',
    price: 0,
    icon: 'Truck',
  },
  {
    id: 'pickup',
    name: 'Самовывоз из магазина',
    time: 'Сегодня',
    price: 0,
    icon: 'Store',
  },
  {
    id: 'express',
    name: 'Экспресс доставка',
    time: 'На следующий день',
    price: 1500,
    icon: 'Zap',
  },
];

const paymentMethods = [
  {
    id: 'card',
    name: 'Банковская карта',
    desc: 'Visa, MasterCard, МИР',
    icon: 'CreditCard',
  },
  {
    id: 'cash',
    name: 'Наличными при получении',
    desc: 'Оплата курьеру',
    icon: 'Wallet',
  },
  {
    id: 'sbp',
    name: 'Система быстрых платежей',
    desc: 'По номеру телефона',
    icon: 'Smartphone',
  },
];

export default function CheckoutModal({
  open,
  onOpenChange,
  total,
  onComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
  });

  const deliveryPrice =
    deliveryMethods.find((m) => m.id === formData.deliveryMethod)?.price || 0;
  const finalTotal = total + deliveryPrice;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
          <DialogDescription>
            Шаг {step} из 3
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Contact Info */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="User" size={20} />
                Контактная информация
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя и фамилия *</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ivan@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Delivery */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="MapPin" size={20} />
                Адрес доставки
              </h3>
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="city">Город *</Label>
                  <Input
                    id="city"
                    placeholder="Москва"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Адрес *</Label>
                  <Input
                    id="address"
                    placeholder="ул. Ленина, д. 1, кв. 1"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Truck" size={20} />
                Способ доставки
              </h3>
              <RadioGroup
                value={formData.deliveryMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, deliveryMethod: value })
                }
                className="space-y-3"
              >
                {deliveryMethods.map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`p-4 hover-glow transition-all ${
                        formData.deliveryMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon
                              name={method.icon as any}
                              size={18}
                              className="text-primary"
                            />
                            <span className="font-semibold">{method.name}</span>
                            {method.price === 0 ? (
                              <Badge variant="outline" className="ml-auto">
                                Бесплатно
                              </Badge>
                            ) : (
                              <span className="ml-auto font-semibold">
                                {method.price.toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {method.time}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="CreditCard" size={20} />
                Способ оплаты
              </h3>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMethod: value })
                }
                className="space-y-3"
              >
                {paymentMethods.map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`p-4 hover-glow transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon
                              name={method.icon as any}
                              size={18}
                              className="text-primary"
                            />
                            <span className="font-semibold">{method.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {method.desc}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <Card className="p-6 bg-muted/30">
              <h4 className="font-semibold mb-4">Итоговая сумма</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>
                    {deliveryPrice === 0
                      ? 'Бесплатно'
                      : `${deliveryPrice.toLocaleString('ru-RU')} ₽`}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>К оплате</span>
                  <span className="text-primary">
                    {finalTotal.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={handleNext}
              className="flex-1"
              disabled={
                (step === 1 &&
                  (!formData.name || !formData.phone || !formData.email)) ||
                (step === 2 && (!formData.city || !formData.address))
              }
            >
              Далее
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="flex-1 animate-glow-pulse"
            >
              Оформить заказ
              <Icon name="Check" size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
