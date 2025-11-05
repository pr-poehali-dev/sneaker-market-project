import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  heroLoaded: boolean;
  compareSlider: number[];
  setCompareSlider: (value: number[]) => void;
}

export default function HeroSection({ heroLoaded, compareSlider, setCompareSlider }: HeroSectionProps) {
  return (
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
                backgroundImage: "url('/images/sneaker-1.jpg')",
                clipPath: `inset(0 ${100 - compareSlider[0]}% 0 0)`
              }}
            />
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{
                backgroundImage: "url('/images/sneaker-2.jpg')",
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
  );
}
