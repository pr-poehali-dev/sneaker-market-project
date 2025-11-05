import Icon from '@/components/ui/icon';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin">
        <Icon name="Loader2" size={32} className="text-primary" />
      </div>
    </div>
  );
}
