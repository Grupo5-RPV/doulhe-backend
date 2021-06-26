import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'

import {
  Participant,
  AuctionItem,
  Auctioneer
} from '../entities'

@Entity('auction_sales')
export default class AuctionSales {
    @PrimaryColumn()
    id: string

    @Column({ type: 'timestamp', nullable: false })
    timestamp: Date

    @Column({ type: 'decimal', nullable: false })
    value: number

    @ManyToOne(() => Participant, participant => participant.id)
    @JoinColumn({ name: 'participant_id' })
    participant: Participant

    @Column({ nullable: false })
    participantId: string

    @OneToOne(() => AuctionItem, auction => auction.id)
    @JoinColumn({ name: 'auction_item_id' })
    auctionItem: AuctionItem

    @Column({ nullable: false })
    auctionItemId: string

    @ManyToOne(() => Auctioneer, auctioneer => auctioneer.id)
    @JoinColumn({ name: 'auctioneer_id' })
    auctioneer: Auctioneer

    @Column({ nullable: false })
    auctioneerId: string
}
