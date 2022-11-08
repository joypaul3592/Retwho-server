const UserRegisterType = new Set(['wholeseller', 'retailer'])

const AllowedFiles = new Set(['feinCopy', 'resalecert', 'license'])

const AllowedFileTypes = new Set(['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'])

const maxFileSize = 50 * 1024 * 1024

const AllowedPriceTypes = new Set(['basic', 'standard', 'premium'])

const SaleShippingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered'
}

const SalePaymentStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled'
}

const SalePaymentMethod = new Set(['check', 'cash', 'card'])

const DefaultDays = 7

const AllowedUsersForModification = new Set(['admin', 'wholeseller', 'retailer'])

const PaymentCurrency = 'usd'

const RoleUserTypes = new Set(['salesman', 'deliveryman', 'manager'])

const UserRegisterFileFields = [
  {
    name: 'feinCopy',
    maxCount: 1
  },
  {
    name: 'resalecert',
    maxCount: 1
  },
  {
    name: 'license',
    maxCount: 1
  }
]

const Roles = {
  ADMIN: 'admin',
  RETAILER: 'retailer',
  WHOLESELLER: 'wholeseller',
  SALESMAN: 'salesman',
  DELIVERYMAN: 'deliveryman',
  MANAGER: 'manager'
}

const AllowedSaleRole = new Set(['admin', 'wholeseller', 'retailer', 'salesman'])

const ResultLimit = 12

module.exports = {
  UserRegisterType,
  AllowedFiles,
  AllowedFileTypes,
  maxFileSize,
  AllowedPriceTypes,
  SaleShippingStatus,
  SalePaymentStatus,
  SalePaymentMethod,
  DefaultDays,
  AllowedUsersForModification,
  PaymentCurrency,
  RoleUserTypes,
  UserRegisterFileFields,
  Roles,
  AllowedSaleRole,
  ResultLimit
}