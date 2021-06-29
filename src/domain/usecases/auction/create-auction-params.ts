export default interface ICreateAuctionParams {
  id: string;
  start: Date;
  end?: Date;
  auctionItems: string[];
  auctioneerId: string;
}
