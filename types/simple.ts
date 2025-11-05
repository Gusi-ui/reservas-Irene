// Simple types for the application
interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  baseDuration: number;
  serviceType: string;
  isActive: boolean;
}

export { type Service };