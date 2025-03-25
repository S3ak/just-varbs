export const normalizeUrlEncoding = (str: string) => {
  return encodeURIComponent(str).replace(/%20/g, "+");
};
