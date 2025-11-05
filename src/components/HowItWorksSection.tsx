import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const howItWorks = [
  { step: 1, title: 'Выбор категории', desc: 'Оригинал или реплика', icon: 'Search' },
  { step: 2, title: 'Примерка с курьером', desc: '2-3 размера на выбор', icon: 'Truck' },
  { step: 3, title: 'Проверка качества', desc: 'Сертификация подлинности', icon: 'ShieldCheck' },
  { step: 4, title: 'Получение заказа', desc: 'Доставка 2-5 дней', icon: 'Package' }
];

export default function HowItWorksSection() {
  return (
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
  );
}
