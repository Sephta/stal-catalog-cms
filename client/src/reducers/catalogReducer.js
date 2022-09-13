export const CatalogDispatchAction = {
  Collection: `collection`,
  SubCollection: `subcollection`,
  Category: `category`,
  SubCategory: `subcategory`,
  Item: `Item`,
};

export const catalogReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CatalogDispatchAction.Collection:
      return { ...state, Collection: payload };

    case CatalogDispatchAction.SubCollection:
      return { ...state, SubCollection: payload };

    case CatalogDispatchAction.Category:
      return { ...state, Category: payload };

    case CatalogDispatchAction.SubCategory:
      return { ...state, SubCategory: payload };

    case CatalogDispatchAction.Item:
      return { ...state, Item: payload };

    default:
      break;
  }
};
