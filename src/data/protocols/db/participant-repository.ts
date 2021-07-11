import { Participant } from '../../../domain/entities'
import ICreatePaticipantParams from '../../../domain/usecases/participant/create-participant-params'

export default interface IParticipantRepository{
    create(participantData: ICreatePaticipantParams): Promise<Participant>
    findByEmail(email: string) : Promise<Participant>
}
