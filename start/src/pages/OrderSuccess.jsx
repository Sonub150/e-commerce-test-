import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiCheckCircle, 
  FiHome, 
  FiPackage, 
  FiMapPin, 
  FiCreditCard, 
  FiCalendar,
  FiDollarSign,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiSmartphone
} from 'react-icons/fi';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [orderReference, setOrderReference] = useState('');

  useEffect(() => {
    // Get order data from location state or localStorage
    if (location.state?.orderReference) {
      setOrderReference(location.state.orderReference);
      setOrderData(location.state.orderData);
    } else {
      // Fallback to localStorage
      const savedOrder = localStorage.getItem('lastOrder');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        setOrderReference(parsedOrder.reference);
        setOrderData(parsedOrder);
      }
    }
  }, [location.state]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodLabel = (method) => {
    const labels = {
      credit: 'Credit Card',
      debit: 'Debit Card',
      upi: 'UPI',
      netbanking: 'Net Banking',
      paypal: 'PayPal',
      cod: 'Cash on Delivery',
      phonepe: 'PhonePe',
      gpay: 'Google Pay',
      amazonpay: 'Amazon Pay',
      paytm: 'Paytm',
      wallet: 'Digital Wallet',
      crypto: 'Cryptocurrency'
    };
    return labels[method] || method;
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      credit: FiCreditCard,
      debit: FiCreditCard,
      upi: FiDollarSign,
      netbanking: FiShield,
      paypal: FiDollarSign,
      cod: FiTruck,
      phonepe: FiSmartphone,
      gpay: FiSmartphone,
      amazonpay: FiCreditCard,
      paytm: FiSmartphone,
      wallet: FiCreditCard,
      crypto: FiDollarSign
    };
    return icons[method] || FiCreditCard;
  };

  const getPaymentMethodColor = (method) => {
    const colors = {
      credit: 'text-blue-500',
      debit: 'text-green-500',
      upi: 'text-purple-500',
      netbanking: 'text-orange-500',
      paypal: 'text-indigo-500',
      cod: 'text-red-500',
      phonepe: 'text-purple-500',
      gpay: 'text-green-500',
      amazonpay: 'text-orange-500',
      paytm: 'text-blue-500',
      wallet: 'text-indigo-500',
      crypto: 'text-yellow-500'
    };
    return colors[method] || 'text-gray-500';
  };

  const getPaymentStatus = (method) => {
    if (method === 'cod') {
      return 'Pending (Pay on Delivery)';
    }
    return 'Paid';
  };

  const getPaymentStatusColor = (method) => {
    if (method === 'cod') {
      return 'text-orange-600';
    }
    return 'text-green-600';
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const PaymentIcon = getPaymentMethodIcon(orderData.paymentMethod);
  const paymentColor = getPaymentMethodColor(orderData.paymentMethod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600 mb-6">
            {orderData.paymentMethod === 'cod' 
              ? 'Thank you for your order. Pay with cash when your order is delivered.'
              : 'Thank you for your purchase. Your order has been confirmed.'
            }
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-6 inline-block">
            <div className="text-sm text-gray-500 mb-2">Order Reference</div>
            <div className="text-2xl font-bold text-indigo-600 font-mono">{orderReference}</div>
            {orderData.isLocalOrder && (
              <div className="mt-2 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                Local Order (Backend Unavailable)
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiShoppingBag className="text-indigo-500" />
              Order Summary
            </h2>
            <div className="space-y-4">
              {orderData.orderItems?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={item.productId.images?.[0]?.url} 
                    alt={item.productId.name} 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.productId.name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-bold text-indigo-600">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total Amount</span>
                <span>${orderData.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiMapPin className="text-green-500" />
                Delivery Address
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="font-semibold">{orderData.address.name}</div>
                <div>{orderData.address.address}</div>
                <div>{orderData.address.city}, {orderData.address.state} {orderData.address.zip}</div>
                <div>{orderData.address.country}</div>
                <div className="text-indigo-600">{orderData.address.phone}</div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PaymentIcon className={paymentColor} />
                Payment Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold">{getPaymentMethodLabel(orderData.paymentMethod)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-green-600">${orderData.total?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${getPaymentStatusColor(orderData.paymentMethod)}`}>
                    {getPaymentStatus(orderData.paymentMethod)}
                  </span>
                </div>
                {orderData.paymentMethod === 'cod' && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FiTruck className="text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Cash on Delivery</span>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      Please keep the exact amount ready. Our delivery partner will collect the payment upon delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiCalendar className="text-purple-500" />
                Order Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Order Placed</div>
                    <div className="text-sm text-gray-500">{formatDate(orderData.timestamp)}</div>
                  </div>
                </div>
                {orderData.paymentMethod !== 'cod' && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Payment Confirmed</div>
                      <div className="text-sm text-gray-500">{formatDate(orderData.timestamp)}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-400">Processing</div>
                    <div className="text-sm text-gray-400">Estimated 1-2 business days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-400">Shipped</div>
                    <div className="text-sm text-gray-400">You'll receive tracking info</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-400">Delivered</div>
                    <div className="text-sm text-gray-400">Estimated 3-5 business days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
            <p className="text-indigo-100 mb-6">
              {orderData.isLocalOrder 
                ? 'This is a local order created while the backend was unavailable. Please contact our support team to confirm your order details.'
                : 'You\'ll receive an email confirmation with your order details and tracking information. Our team will start processing your order right away!'
              }
            </p>
            {orderData.isLocalOrder && (
              <div className="mb-6 p-4 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-300">
                <p className="text-yellow-100 text-sm">
                  <strong>Note:</strong> Since this order was created locally, please save your order reference number and contact our customer support to ensure your order is properly recorded in our system.
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGoHome}
                className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FiHome className="w-5 h-5" />
                Continue Shopping
              </button>
              <button
                onClick={() => window.print()}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FiPackage className="w-5 h-5" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <FiPackage className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Fast Delivery</h4>
            <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <FiShield className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
            <p className="text-sm text-gray-600">Your payment information is protected</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <FiCheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Easy Returns</h4>
            <p className="text-sm text-gray-600">30-day return policy for your peace of mind</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 