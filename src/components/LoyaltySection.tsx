import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const loyaltyLevels = [
  { name: 'Bronze', threshold: 0, discount: 5, icon: 'Award', color: 'text-orange-400' },
  { name: 'Silver', threshold: 30000, discount: 10, icon: 'Medal', color: 'text-gray-300' },
  { name: 'Gold', threshold: 70000, discount: 15, icon: 'Crown', color: 'text-yellow-400' }
];

export default function LoyaltySection() {
  const [totalPurchases] = useState(45000);
  
  const currentLevel = [...loyaltyLevels]
    .reverse()
    .find(level => totalPurchases >= level.threshold) || loyaltyLevels[0];
  
  const nextLevel = loyaltyLevels.find(level => level.threshold > totalPurchases);
  
  const progressToNext = nextLevel 
    ? ((totalPurchases - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100
    : 100;

  return (
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
  );
}
