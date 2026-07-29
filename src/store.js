import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialInventory = [
  { id: '1', name: 'Espresso', category: 'Coffee', price: 4.50, stock: 100, image: '/espresso.png' },
  { id: '2', name: 'Latte', category: 'Coffee', price: 5.50, stock: 80, image: '/latte.png' },
  { id: '3', name: 'Cappuccino', category: 'Coffee', price: 6.00, stock: 60, image: '/cappuccino.png' },
  { id: '4', name: 'Mocha', category: 'Coffee', price: 6.50, stock: 50, image: '/mocha.png' },
  { id: '5', name: 'Croissant', category: 'Food', price: 3.50, stock: 30, image: '/croissant.png' },
  { id: '6', name: 'Blueberry Muffin', category: 'Food', price: 4.00, stock: 25, image: '/muffin.png' }
];

export const useStore = create(
  persist(
    (set, get) => ({
      inventory: initialInventory,
      orders: [],
      user: null, // null when not logged in
      
      login: (username, password) => {
        if (username === 'admin' && password === 'admin') {
          set({ user: { username: 'admin', role: 'manager' } });
          return true;
        }
        return false;
      },
      
      logout: () => set({ user: null }),
      
      addInventoryItem: (item) => set((state) => ({
        inventory: [...state.inventory, { ...item, id: Date.now().toString() }]
      })),
      
      updateInventoryItem: (id, updatedFields) => set((state) => ({
        inventory: state.inventory.map(item => 
          item.id === id ? { ...item, ...updatedFields } : item
        )
      })),
      
      placeOrder: (cartItems, table, taker) => {
        const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
        // Deduct inventory
        const currentInventory = get().inventory;
        const updatedInventory = currentInventory.map(invItem => {
          const cartItem = cartItems.find(c => c.id === invItem.id);
          if (cartItem) {
            return { ...invItem, stock: invItem.stock - cartItem.quantity };
          }
          return invItem;
        });
        
        const newOrder = {
          id: 'ORD-' + Math.floor(Math.random() * 10000),
          time: new Date().toISOString(),
          items: cartItems,
          total,
          table,
          taker,
          status: 'pending', // pending, delivered, cancelled
          duration: '0 mins' // mock duration
        };
        
        set((state) => ({
          inventory: updatedInventory,
          orders: [newOrder, ...state.orders]
        }));
      },
      
      cancelOrder: (orderId) => set((state) => {
        const orderToCancel = state.orders.find(o => o.id === orderId);
        if (!orderToCancel || orderToCancel.status === 'cancelled') return state;
        
        // Restore inventory
        const updatedInventory = state.inventory.map(invItem => {
          const orderedItem = orderToCancel.items.find(i => i.id === invItem.id);
          if (orderedItem) {
            return { ...invItem, stock: invItem.stock + orderedItem.quantity };
          }
          return invItem;
        });
        
        return {
          inventory: updatedInventory,
          orders: state.orders.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o)
        };
      }),
      
      completeOrder: (orderId) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status: 'delivered' } : o)
      }))
    }),
    {
      name: 'cafe-aylanto-storage', // key in local storage
    }
  )
);
