export const client = "https://productcar-g0hshwf2eufwfwaz.canadacentral-01.azurewebsites.net/api";

const CREATE = `${client}/product/createProduct`;
const GETLIST = `${client}/product/list`;
const GETPRODUCTBYID = (id) => `${client}/product/${id}`;
const UPDATEPRODUCTBYID = (id) => `${client}/product/${id}`;
const DELETEPRODUCTBYID = (id) => `${client}/product/${id}`;

export {
  CREATE,
  GETLIST,
  GETPRODUCTBYID,
  UPDATEPRODUCTBYID,
  DELETEPRODUCTBYID,
};
