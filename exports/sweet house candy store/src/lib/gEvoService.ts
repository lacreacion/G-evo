import { Product, Order } from '@/types';

export interface GEvoConfig {
  apiBaseUrl: string;
  tenantId: string;
  apiKey: string;
  cdnAssetTemplate: string;
  enableDynamicImages: boolean;
}

export class GEvoService {
  private config: GEvoConfig;
  public connectionStatus: 'ready' | 'connected' | 'syncing' | 'offline' = 'ready';
  public lastSyncTimestamp: Date = new Date();

  constructor(customConfig?: Partial<GEvoConfig>) {
    this.config = {
      apiBaseUrl: 'https://api.g-evo.store/v2/',
      tenantId: 'sweethouse-latam',
      apiKey: 'GEVO_PUBLIC_KEY_DEMO_2026',
      cdnAssetTemplate: 'https://cdn.g-evo.io/assets/{tenantId}/products/{sku}/{variant}.webp',
      enableDynamicImages: true,
      ...customConfig
    };
  }

  /**
   * Resuelve dinámicamente la URL de la imagen del dulce según la plataforma g-evo
   */
  public resolveImageUrl(product: Product, variant = 'hero'): string {
    if (!product) return '';

    if (this.config.enableDynamicImages && product.gEvo && product.gEvo.dynamicImageEndpoint) {
      const gEvoCdnUrl = this.config.cdnAssetTemplate
        .replace('{tenantId}', this.config.tenantId)
        .replace('{sku}', product.sku)
        .replace('{variant}', variant);

      // Usamos la imagen curada/local como base garantizada, mapeada a la referencia de g-evo
      return product.image || gEvoCdnUrl;
    }

    return product.image;
  }

  /**
   * Sincronización simulada o directa con la API de g-evo
   */
  public async syncCatalog(productCount: number): Promise<{ success: boolean; syncedItems: number; tenant: string; message: string }> {
    this.connectionStatus = 'syncing';

    return new Promise((resolve) => {
      setTimeout(() => {
        this.connectionStatus = 'connected';
        this.lastSyncTimestamp = new Date();
        resolve({
          success: true,
          syncedItems: productCount,
          tenant: this.config.tenantId,
          message: 'Catálogo de cajas e imágenes dinámicas sincronizadas exitosamente con g-evo.'
        });
      }, 750);
    });
  }

  /**
   * Notificar pedido confirmado a g-evo
   */
  public async notifyOrder(order: Order): Promise<{ gEvoTxId: string; status: string }> {
    console.log('[g-evo] Enviando orden para reserva de inventario:', order.id);
    return {
      gEvoTxId: `TX-GEVO-${Date.now()}`,
      status: 'confirmed'
    };
  }
}

export const gEvoService = new GEvoService();

