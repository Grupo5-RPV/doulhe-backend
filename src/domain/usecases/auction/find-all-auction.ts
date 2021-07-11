import AuctionRepository from '../../../data/protocols/db/auction-repository'
import Auction from '../../entities/auction'
import InvalidParamError from '../../../presentation/errors/invalid-param-error'
export default class FindAllAuction{ 
    constructor (
        private readonly auctionRepository: AuctionRepository,
    ) {
        this.auctionRepository = auctionRepository
    }

    
    async findAll(): Promise<Auction[]>{
        const auctions = await this.auctionRepository.findAll()
        auctions.sort((a,b) => this.compare(a,b))
        return auctions
    }

    compare(auction1:Auction,auction2:Auction):number{
        if(auction1.end && auction2){
            const endDate1 = new Date(auction1.end)
            const endDate2 = new Date(auction2.end)
            if(endDate1 < endDate2){
                return 1
            }
            return -1
        }
        return 0
    }

}