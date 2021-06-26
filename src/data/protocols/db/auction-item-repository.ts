import IFindAuctionItem from 'src/domain/usecases/auction-item/find-auction-item'
import IUpdateAuctionItem from 'src/domain/usecases/auction-item/update-auction-item'

export default interface IAuctionItemRepository extends IUpdateAuctionItem, IFindAuctionItem {

}
