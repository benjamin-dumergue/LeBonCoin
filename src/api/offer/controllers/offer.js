/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      const idUser = ctx.state.user.id; // ID utilisateur connecté
      // console.log("idUser : " + idUser);

      const userId = ctx.params.id;
      // console.log("userId : " + userId);

      const userData = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        {
          populate: {
            offers: true,
          },
        }
      );

      const offer = userData.offers;

      for (let i = 0; i < offer.length; i++) {
        const offerId = offer[i].id;
        // await strapi.entityService.delete("api::offer.offer", offerId);
      }

      return { message: "All offers deleted" };
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = { message: error.message };
    }
  },

  async create(ctx) {
    try {
      const userRequest = ctx.state.user.id;
      console.log(userRequest);
      const ownerOffer = ctx.request.body.data.owner;
      console.log(ownerOffer);
      if (userRequest === ownerOffer) {
        const response = await super.create(ctx);
        console.log("OK !");
        return "Yeah is good";
        // return response;
      } else {
        console.log("erreur");
        return "You are not the owner";
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = { message: error.message };
    }
  },
}));
