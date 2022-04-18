export const GET_SHOP_DATA = `{
  shop {
    id
    name
	ianaTimezone
    email
    url
    currencyCode
    primaryDomain {
      url
      sslEnabled
    }
    plan {
      displayName
      partnerDevelopment
      shopifyPlus
    }
  }
}`;
