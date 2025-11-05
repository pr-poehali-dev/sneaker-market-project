import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  cartCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setTrackingOpen: (open: boolean) => void;
}

export default function Navigation({
  cartCount,
  mobileMenuOpen,
  setMobileMenuOpen,
  setCartOpen,
  setTrackingOpen
}: NavigationProps) {
  return (
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
  );
}
