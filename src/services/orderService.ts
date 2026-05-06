import api from './api';
import type {
  ApiResponse,
  Order,
  CreateOrderRequest,
} from '@/types';

interface BackendOrderLineItem {
  dishId: number;
  dishName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

interface BackendOrder {
  id: number;
<<<<<<< HEAD
<<<<<<< HEAD
  orderNumber: string;
=======
>>>>>>> parent of 6767818 (fix(app): improve dashboard orders and inventory finance flows)
=======
>>>>>>> parent of 6767818 (fix(app): improve dashboard orders and inventory finance flows)
  tableIdentifier: string;
  orderDate: string;
  lineItems: BackendOrderLineItem[];
  totalAmount: number;
<<<<<<< HEAD
<<<<<<< HEAD
  status: OrderStatus;
=======
>>>>>>> parent of 6767818 (fix(app): improve dashboard orders and inventory finance flows)
=======
>>>>>>> parent of 6767818 (fix(app): improve dashboard orders and inventory finance flows)
}

const mapOrder = (order: BackendOrder): Order => ({
  id: order.id,
  orderNumber: String(order.id),
  customerName: order.tableIdentifier,
  orderType: 'DINE_IN',
<<<<<<< HEAD
<<<<<<< HEAD
  status: order.status || 'PENDING',
=======
  status: 'PENDING',
>>>>>>> parent of 6767818 (fix(app): improve dashboard orders and inventory finance flows)
=======
  status: 'PENDING',
>>>>>>> parent of 6767818 (fix(app): improve dashboard orders and inventory finance flows)
  totalAmount: order.totalAmount,
  lineItems: order.lineItems.map((item, index) => ({
    id: index,
    dishId: item.dishId,
    dishName: item.dishName,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    subtotal: item.lineTotal,
  })),
  createdAt: order.orderDate,
  updatedAt: order.orderDate,
});

class OrderService {
  private readonly basePath = '/api/orders';

  async getAll(): Promise<Order[]> {
    const response = await api.get<ApiResponse<BackendOrder[]>>(this.basePath);
    return response.data.data.map(mapOrder);
  }

  async getById(id: number): Promise<Order> {
    const response = await api.get<ApiResponse<BackendOrder>>(`${this.basePath}/${id}`);
    return mapOrder(response.data.data);
  }

  async create(data: CreateOrderRequest): Promise<Order> {
    const response = await api.post<ApiResponse<BackendOrder>>(this.basePath, {
      tableIdentifier: data.tableIdentifier,
      lineItems: data.lineItems.map((item) => ({
        dishId: item.dishId,
        dishName: item.dishName,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
      })),
    });
    return mapOrder(response.data.data);
  }

  async delete(id: number): Promise<void> {
    await api.delete(`${this.basePath}/${id}`);
  }
<<<<<<< HEAD
<<<<<<< HEAD

  async advanceStatus(id: number): Promise<Order> {
    const response = await api.put<ApiResponse<BackendOrder>>(`${this.basePath}/${id}/advance`);
    return mapOrder(response.data.data);
  }

  async cancelStatus(id: number): Promise<Order> {
    const response = await api.put<ApiResponse<BackendOrder>>(`${this.basePath}/${id}/cancel`);
    return mapOrder(response.data.data);
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    const response = await api.put<ApiResponse<BackendOrder>>(`${this.basePath}/${id}/status?status=${status}`);
    return mapOrder(response.data.data);
  }
=======
>>>>>>> parent of 6767818 (fix(app): improve dashboard orders and inventory finance flows)
=======
>>>>>>> parent of 6767818 (fix(app): improve dashboard orders and inventory finance flows)
}

export const orderService = new OrderService();
