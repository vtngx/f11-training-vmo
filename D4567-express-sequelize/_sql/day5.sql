USE `D4-F11N12-DB`;

-- 2. Select tất cả thông tin về đơn hàng, chi tiết đơn hàng,
-- chi tiết sản phẩm trong đơn hàng của mỗi customer.
SELECT *
FROM (
  (
    (
    Orders 
      JOIN OrderDetails ON Orders.id = OrderDetails.orderId
    ) 
    JOIN Products ON Products.id = OrderDetails.ProductId
  ) 
  JOIN Customers ON Customers.id = Orders.CustomerId
) 
WHERE 
  Orders.isDeleted = 0;

-- 3. Select tất cả User (có cả thông tin customer)
SELECT *
FROM (
  Users JOIN Customers ON Users.id = Customers.userId
)

-- 4. Select tất cả sản phẩm & ảnh của mỗi sản phẩm,
-- có limit 0-20, có name ~ "Honda"
SELECT *
FROM (
  Products JOIN ProductImages ON Products.id = ProductImages.productId
)
WHERE Products.name LIKE "%Honda%"
LIMIT 20