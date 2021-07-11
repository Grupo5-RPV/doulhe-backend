import { IdGenerator } from "../../../data/protocols/identification/id-generator"
import IParticipantRepository from "../../../data/protocols/db/participant-repository"
import InvalidParamError from "../../../presentation/errors/invalid-param-error"
import { Participant } from "../../../domain/entities"
import Hasher from "../../../data/protocols/criptography/hasher"
import ICreatePaticipantParams from "./create-participant-params"

export default class CreateParticipant{

    constructor(
        private participantRepository : IParticipantRepository,
        private idGenerator : IdGenerator,
        private hasher : Hasher
    ){
        this.participantRepository = participantRepository
        this.idGenerator = idGenerator
        this.hasher = hasher;
    }

    async create(participantData : ICreatePaticipantParams): Promise<Participant>{
        participantData.id = this.idGenerator.createUUID()

        const participantExistis = await this.participantRepository.findByEmail(participantData.email)
        if(participantExistis){
            throw new InvalidParamError("E-mail já cadastrado")
        }  
        participantData.password = await this.hasher.hash(participantData.password)
        const participant = await this.participantRepository.create(participantData);
        return participant;

    }
}