export default interface ICreateAuctionItemParams {
  id?: string
  title: string
  description: string
  minimumBid: number
  imagePath: string
  categoryId: string
  itemProviderId: string
}
