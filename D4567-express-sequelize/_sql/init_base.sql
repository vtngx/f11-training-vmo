use sys;

create database if not exists `D4-F11N12-DB`;

use `D4-F11N12-DB`;

create table if not exists Users (
  id        varchar(36) primary key,
  username  varchar(32) not null unique,
  password  varchar(250) not null,
  age       integer(2) not null,
  email     varchar(100) not null,
  phone     varchar(20),
  address   varchar(500),
  isActive  integer(1) not null,
  createdBy timestamp,
  createdAt timestamp,
  updateAt  timestamp,
  updateBy  timestamp
);

create table if not exists Customers (
  id            varchar(36) primary key,
  userId        varchar(36) not null references Users(id),
  paymentMethod integer(10),
  isActive      integer(1) not null
);

create table if not exists Products (
  id          varchar(36) primary key,
  name        varchar(300) not null,
  description varchar(4000) not null,
  price       float(12) not null,
  tax         float(12) not null,
  discount    float(12) not null,
  totalPrice  float(12) not null,
  isDeleted   integer(1) not null,
  createdBy   timestamp,
  createdAt   timestamp,
  updateAt    timestamp,
  updateBy    timestamp
);

create table if not exists Orders (
  id          varchar(36) primary key,
  customerId  varchar(36) not null references Customers(id),
  price       float(12) not null,
  tax         float(12) not null,
  discount    float(12) not null,
  totalPrice  float(12) not null,
  isDeleted   integer(1) not null,
  createdBy   timestamp,
  createdAt   timestamp,
  updateAt    timestamp,
  updateBy    timestamp
);

create table if not exists OrderDetails (
  id          varchar(36) primary key,
  orderId     varchar(36) not null references Orders(id),
  productId   varchar(36) not null references Products(id),
  price       float(12) not null,
  tax         float(12) not null,
  discount    float(12) not null,
  totalPrice  float(12) not null,
  isDeleted   integer(1) not null,
  createdBy   timestamp,
  createdAt   timestamp,
  updateAt    timestamp,
  updateBy    timestamp
);

create table if not exists ProductImages (
  id          varchar(36) primary key,
  name        integer(10) not null,
  productId   varchar(36) not null references Products(id),
  url         integer(10) not null,
  isDeleted   integer(1) not null,
  createdBy   timestamp,
  createdAt   timestamp,
  updateAt    timestamp,
  updateBy    timestamp
);