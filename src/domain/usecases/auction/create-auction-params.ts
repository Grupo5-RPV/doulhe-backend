export default interface ICreateAuctionParams {
  id: string;
  start: string;
  end?: string;
  auctionItems: string[];
  auctioneerId: string;
}
