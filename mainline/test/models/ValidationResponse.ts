import { Metadata } from '../models/Metadata';

export type ValidationResponse = {
    valid: boolean,
    pendingRequest: boolean,
    metadata: Metadata,
    senderAccessLevel: string,
    restrictedAttendees: Set<string>,
}
