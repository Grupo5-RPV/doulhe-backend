import { Auction } from '../../../domain/entities';
import InvalidParamError from '../../../presentation/errors/invalid-param-error';
import AuctionRepository from '../../../data/protocols/db/auction-repository'
export default class FindByIdAuction{
    constructor(
        private readonly auctionRepository: AuctionRepository,
    ){
        this.auctionRepository = auctionRepository
    }

    async findById(id: string): Promise<Auction>{
        const auction = await this.auctionRepository.findById(id)
        if(!auction){
            throw new InvalidParamError("Leilão não existe Id: "+id);
        }
        return auction
    }
}