import FindAuctionById from "../../domain/usecases/auction/find-by-id-auction";
import InvalidParamError from "../errors/invalid-param-error";
import { badRequest,ok,serverError } from "../helpers/http-helper";
import Controller from "../protocols/controller";
import httpRequest from "../protocols/http-request";
import httpResponse from "../protocols/http-response";

export default class FindByIdAuctionController implements Controller{
    constructor(
        private readonly findAuctionById: FindAuctionById
    ){
        this.findAuctionById = findAuctionById
    }
    async handle(httpRequest: httpRequest): Promise<httpResponse>{
        const {id} = httpRequest.params
        
        try{
            const auction = await this.findAuctionById.findById(id)
            return ok(auction)
        }catch(error){
            if(error instanceof InvalidParamError){
                return badRequest(error)
            }
            return serverError(error)
        }
        
    }

    
}