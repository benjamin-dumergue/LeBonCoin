module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/offers/deleteAll/:id",
      handler: "offer.deleteAll",
    },
  ],
};
