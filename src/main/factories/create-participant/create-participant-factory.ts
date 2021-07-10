import CreateParticipant from "../../../domain/usecases/participant/create-participant";
import BcryptAdapter from "../../../infra/criptography/bcript-adapter";
import UUIDv4Adapter from "../../../infra/identification/uuidv4-adapter";
import ParticipantRepository from "../../../infra/typeorm/repositories/participant-repository";
import CreateParticipantController from "../../../presentation/controllers/create-participant-controller";
import Controller from "../../../presentation/protocols/controller";
import { CreateParticipantValidationFactory } from "./create-participant-validation-factory";

export const createParticipantFactory = (): Controller =>{
    const createParticipant = new CreateParticipant(
        new ParticipantRepository,
        new UUIDv4Adapter(),
        new BcryptAdapter(12)
    )
    return new CreateParticipantController(CreateParticipantValidationFactory(),createParticipant)
}