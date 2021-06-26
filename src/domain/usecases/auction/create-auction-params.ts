export default interface ICreateAuctionParams {
  start: Date;
  end?: Date;
  auctionItems: string[];
}
