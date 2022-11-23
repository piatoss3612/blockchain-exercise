export const shortenAddress = (address) => {
  const first = address.slice(0, 6);
  const last = address.slice(address.length - 4);

  return `${first}...${last}`;
};
