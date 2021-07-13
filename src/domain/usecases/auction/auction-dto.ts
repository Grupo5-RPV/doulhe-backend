export default interface AuctionDTO {
  id: string,
  start: string,
  end: string,
  closed: number,
  auctioneerId: string
  items: object[]
}
